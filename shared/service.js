import { Guid } from 'guid-typescript';

function createService() {
  const key = 'options';

  return {
    get: function (id) {
      return this.getAll().then((result) => {
        return result.find((i) => i.id === id);
      });
    },

    take: function (index) {
      return this.getAll().then((result) => {
        return result[index - 1];
      });
    },

    getAll: function () {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], (result) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            reject(chrome.runtime.lastError.message);
          } else {
            resolve(result[key] || []);
          }
        });
      });
    },

    add: function (item) {
      return this.getAll().then((result) => {
        const entity = { id: Guid.raw(), ...item };
        const items = [...result, entity];
        return this.update(items).then(() => entity);
      });
    },

    remove: function (item) {
      return this.getAll().then((result) => {
        const items = result.filter((i) => i.id !== item.id);
        return this.update(items).then(() => item);
      });
    },

    update: function (items) {
      return new Promise((resolve, reject) => {
        const obj = {};
        obj[key] = items;
        chrome.storage.local.set(obj, () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            reject(chrome.runtime.lastError.message);
          } else {
            resolve(items);
          }
        });
      });
    },
  };
}

export const service = createService();
