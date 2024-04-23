import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../Screens/Home/Home';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {useAppContext} from '../Context/AppContext';
import debounce from 'lodash/debounce';
import {IAPIData} from '../Types/APIDataType';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Snackbar from 'react-native-snackbar';

const Drawer = createDrawerNavigator();

function DrawerNavigation(): React.JSX.Element {
  const {searchResults, setSearchResults} = useAppContext();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getData = async () => {
    try {
      const response: AxiosResponse<IAPIData> = await axios({
        method: 'get',
        url: `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&text=${searchQuery}`,
      });
      setSearchResults(response.data.photos.photo);
      console.log(response.data);
      return response;
    } catch (error) {
      Snackbar.show({
        text: 'Something went wrong',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Refresh',
          textColor: 'green',
          onPress: () => {
            getData();
          },
        },
      });
    }
  };

  useEffect(() => {
    if (searchQuery === '') {
      setSearchResults(undefined);
    } else {
      getData();
    }
  }, [searchQuery]);

  return (
    <Drawer.Navigator
      screenOptions={{
        header: ({navigation}) => (
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Icon name="menu" size={30} color="#000" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchBar}
              placeholder="Search..."
              onChangeText={debounce(
                (text: string) => setSearchQuery(text),
                300,
              )}
            />
          </View>
        ),
      }}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  searchBar: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    height: 50,
    width: '90%',
    alignSelf: 'center',
  },
});

export default DrawerNavigation;
