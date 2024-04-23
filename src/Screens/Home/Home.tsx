import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React from 'react';
import {useHome} from './useHome';
import {screenDimensions} from '../../Constants/ScreenDimensions';
import {useAppContext} from '../../Context/AppContext';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default function Home() {
  const {apiPhotos, setApiPhotos, searchResults} = useAppContext();
  const {handleEndReach, isAPILoading} = useHome({
    apiPhotos,
    setApiPhotos,
  });

  console.log(isAPILoading);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{marginBottom: 120}}>
        <Text style={styles.header}>Gallery</Text>
        {apiPhotos === undefined ? (
          <View style={[styles.loadingContainer]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={searchResults ? searchResults : apiPhotos}
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                <Image source={{uri: item.url_s}} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            )}
            keyExtractor={(item, index): any => index}
            numColumns={2}
            contentContainerStyle={styles.gallery}
            onEndReached={searchResults ? () => {} : handleEndReach}
            ListFooterComponent={() =>
              isAPILoading && <ActivityIndicator size="large" color="#0000ff" />
            }
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gallery: {
    alignItems: 'center',
    paddingBottom: 80,
  },
  itemContainer: {
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    width: (screenDimensions.screenWidth - 30) / 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
});
