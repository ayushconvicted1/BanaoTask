import axios, {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import {asyncStore} from '../../Utils/AsyncStorageHelper';
import {asyncStoreData} from '../../Constants/AsyncStoreData';
import {ToastAndroid} from 'react-native';
import {IAPIData, Photo} from '../../Types/APIDataType';
import {IAppContext} from '../../Types/ContextTypes';
import Snackbar from 'react-native-snackbar';

export const useHome = ({
  apiPhotos,
  setApiPhotos,
}: {
  apiPhotos: Photo[] | undefined;
  setApiPhotos: React.Dispatch<React.SetStateAction<Photo[] | undefined>>;
}) => {
  const [page, setPage] = useState<number>(1);
  const [isAPILoading, setIsAPILoading] = useState(false);

  useEffect(() => {
    checkAsync();
  }, []);

  const handleEndReach = () => {
    setPage(pre => {
      if (pre >= 3) {
        ToastAndroid.show('End reached', ToastAndroid.SHORT);
        return pre;
      } else {
        getData(pre + 1)
          .then(({data}) => {
            if (isAPILoading === false) {
              setApiPhotos(prev => prev?.concat(data.photos.photo));
            }
            console.log(data);
          })
          .catch(err => {
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
          });
        return pre + 1;
      }
    });
  };

  const checkAsync = async () => {
    try {
      const storedResponse = await asyncStore.getValueFor(
        asyncStoreData.images,
      );
      if (storedResponse) {
        setApiPhotos(storedResponse);
        console.log('API data rendered from local storage');
      }
      const response: AxiosResponse<IAPIData> = await getData(page);
      if (JSON.stringify(response.data) === JSON.stringify(storedResponse)) {
        console.log('API data is same as local storage. No reload.');
        return;
      } else {
        console.log(
          'API data is changed from local storage. Updating local storage and rerendering data',
        );
        asyncStore.save(asyncStoreData.images, response.data.photos.photo);
        setApiPhotos(response.data.photos.photo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async (pageNum: number) => {
    setIsAPILoading(true);
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=${pageNum}&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`,
      });
      setIsAPILoading(false);
      return response;
    } catch (error) {
      Snackbar.show({
        text: 'Something went wrong',
        duration: Snackbar.LENGTH_INDEFINITE,
        action: {
          text: 'Refresh',
          textColor: 'green',
          onPress: () => {
            checkAsync();
          },
        },
      });
    }
  };

  return {apiPhotos, handleEndReach, isAPILoading};
};
