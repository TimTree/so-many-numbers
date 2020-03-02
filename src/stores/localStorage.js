/* eslint-disable max-len */

/**
 * The localStorage class stores game save data and contains functions to
 * load and add save data.
 */
export default {
  /**
   * The save data contains:
   *
   * firstRun: True if the player passed onboarding, false otherwise
   * version: The user's last played version of the game. The version increments
   * each feature update. If the user's version if lower than the current,
   * the game will display an update notice.
   * theme: 0 for unspecified (use system-defined theme).
   * Otherwise 'light' or 'dark'
   * titleView: 0 if the player last viewed the operators menu or 1 if
   * the player last viewed the Recents pane
   * savedSet: The set of operators that was last clicked on
   * difficulty: The player's current set level (simple or standard)
   * The game used to refer to level as difficulty, so we keep the
   * name difficulty in localStorage for compatibility reasons.
   * recents: The most recent operator combinations the player played
   * sets: An object that tracks the player's high score/number of plays
   * for each level/operator combo
   *
   * Example:
   *
   * sets: {
   *   +−×÷: {
   *      simple: {
   *        highScore: 37.9,
   *        timesFinished: 2,
   *      }
   *      standard: {
   *        highScore: 46.5,
   *        timesFinished: 4,
   *      }
   *    },
   *  ×: {
   *      standard: {
   *        highScore: 44.3,
   *        timesFinished: 8,
   *      }
   *    }
   * }
   *
   * The object is initially blank and dynamically adds sets/scores
   * based on what the player plays.
   */
  saveData: {
    firstRun: false,
    version: 1,
    theme: 0,
    titleView: 0,
    savedSet: ['+', '−', '×', '÷'],
    difficulty: 'standard',
    recents: [],
    sets: {},
  },

  /**
   * Test browser support for local storage and save the result
   * to a variable so we don't need to run the local storage check
   * multiple times
   */
  supportsLocalStorage: true,
  testLocalStorage() {
    const doesItWork = 'test';
    try {
      localStorage.setItem(doesItWork, '1');
      localStorage.removeItem(doesItWork);
    } catch (error) {
      this.supportsLocalStorage = false;
    }
  },

  /**
   * Load the user's save data from localStorage to the saveData
   * object.
   *
   * Each time we want to save something to localStorage, we modify the
   * saveData object then run the below save() function to save the entire
   * saveData object to storage. This is so browsers without localStorage
   * support can still run the game.
   */
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
  /**
   * Save the saveData object to localStorage if the browser supports it.
   * The save data must be stringified to JSON because localStorage can
   * only handle strings.
   */
  save() {
    if (this.supportsLocalStorage) {
      localStorage.setItem('soManyNumbersSaveData', JSON.stringify(this.saveData));
    }
  },
  /**
   * Wipe the save data and reload the game
   */
  wipeData() {
    localStorage.removeItem('soManyNumbersSaveData');
    window.location.reload();
  },
};
