/* eslint-disable max-len */
export default {
  supportsLocalStorage: true,
  saveData: {
    recents: [],
    ops: {},
  },
  testLocalStorage() {
    const doesItWork = 'test';
    try {
      localStorage.setItem(doesItWork, '1');
      localStorage.removeItem(doesItWork);
    } catch (error) {
      this.supportsLocalStorage = false;
    }
  },
  configureSaveData() {
    this.testLocalStorage();
    if (this.supportsLocalStorage) {
      if (localStorage.getItem('soManyNumbersSaveData')) {
        const parsedData = JSON.parse(localStorage.getItem('soManyNumbersSaveData'));
        for (let i = 0; i < Object.keys(parsedData).length; i += 1) {
          if (Object.prototype.hasOwnProperty.call(this.saveData, Object.getOwnPropertyNames(parsedData)[i])) {
            this.saveData[Object.keys(this.saveData)[Object.keys(this.saveData)
              .indexOf(Object.getOwnPropertyNames(parsedData)[i])]] = parsedData[Object.keys(parsedData)[i]];
          }
        }
      }
    }
  },
  save() {
    if (this.supportsLocalStorage) {
      localStorage.setItem('soManyNumbersSaveData', JSON.stringify(this.saveData));
    }
  },
};
