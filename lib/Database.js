import { AsyncStorage } from 'react-native';

// Database class with static functions 
// that handle interaction with AsyncStorage
export default class Database {

  // static async function that returns a Promise.
  // Fetches all the Items using AsyncStorage and returns them as a set
  static getAllItems = async () => {
    return new Promise((resolve, reject) => {
      try {
        // Get all the keys
        AsyncStorage.getAllKeys((error, keys) => {
          // Get all the Items for the keys
          AsyncStorage.multiGet(keys, (err, stores) => {
            let fetchedItems = new Set();
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

  // Remove an Item by key,
  // return the Promise from the AsyncStorage.removeItem function call
  static removeItem = async (key) => {
    return AsyncStorage.removeItem(key);
  }
 
  // Store an item by key,
  // return the Promise from the AsyncStorage.setItem function call
  static storeItem = async (id, item) => {
		return AsyncStorage.setItem(id, JSON.stringify(item));
	}

  // Update an item by key
  // return the promise from the AsyncStorage.mergeItem function call
  static mergeItem = (id, itemString) => {
    return AsyncStorage.mergeItem(id, itemString);
  }
}
