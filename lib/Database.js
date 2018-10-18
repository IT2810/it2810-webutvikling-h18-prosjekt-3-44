import { AsyncStorage } from 'react-native';

export default class Database {

  static getAllItems = async () => {
    return new Promise((resolve, reject) => {
      try {
        AsyncStorage.getAllKeys((error, keys) => {
          AsyncStorage.multiGet(keys, (err, stores) => {
            let fetchedItems = [];
            stores.map((result, i, store) => {
              let value = store[i][1];
              fetchedItems.push(JSON.parse(value));
            });
            resolve(fetchedItems);
          });
        });
      } catch(error) {
        reject(error);
      }
    });
  }

  static removeItem = async (key) => {
    return AsyncStorage.removeItem(key);
  }
  
  static storeItem = async (id, item) => {
		return AsyncStorage.setItem(id, JSON.stringify(item));
	}
}
