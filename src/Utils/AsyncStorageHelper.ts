import AsyncStorage from '@react-native-async-storage/async-storage';

const save = async (key: any, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error: any) {
    console.error('Unable to save in Async store ', key);
    console.error(error.message);
  }
};

const getValueFor = async (key: string) => {
  try {
    let result = await AsyncStorage.getItem(key);
    if (!result) {
      return result;
    }
    return JSON.parse(result);
  } catch (error: any) {
    console.error('Something went wrong.');
    console.error(error.message);
  }
};

export const asyncStore = {
  save,
  getValueFor,
};
