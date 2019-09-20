/**
 * The gameStore class holds the current state of a game and contains functions
 * to generate games and display some state variables to the view.
 */
export default {
  state: {
    numberOfProblems: 0,
    numberOfProblemsSolved: 0,
    expressions: [],
    solutions: [],
    difficulty: '',
    operators: [],
    currentTime: '0.0',
  },

  /**
   * Grab the three "checkpoint" problem numbers when the game will change
   * background color
   */
  getOneThird() {
    return Math.floor(this.state.numberOfProblems / 3);
  },
  getTwoThirds() {
    return Math.floor(this.state.numberOfProblems / 3 * 2);
  },
  getNineTenth() {
    return Math.floor(this.state.numberOfProblems / 10 * 9);
  },

  /**
   * Generate a game, given a difficulty and set of operators
   * @param {string} diff - the difficulty of the game - Simple or Standard
   * @param {string} ops - the operators (set) to use for the game
   */
  createGame(diff, ops) {
    /**
     * Change this number if you want to debug.
     * If you make the number less than 1 (aka no game) or over 100 (risking
     * an infinite loop since we don't repeat problems and some diff/sets
     * only have 100 possible problems), edit the problem count to the nearest
     * valid amount.
     */
    this.state.numberOfProblems = 30;

    if (this.state.numberOfProblems < 1) {
      this.state.numberOfProblems = 1;
    } else if (this.state.numberOfProblems > 100) {
      this.state.numberOfProblems = 100;
    }
    /**
     * Define the ruleset (math problem bounds) based on chosen difficulty
     */
    const ruleset = [];
    if (diff === 'simple') {
      this.state.difficulty = 'Simple';
      ruleset.push(10, 15, 10);
    } else {
      this.state.difficulty = 'Standard';
      ruleset.push(20, 30, 12);
    }
    /**
     * Configure the game set.
     * If the difficulty/set is invalid, the game will default
     * to the Standard difficulty with all four operators.
     *
     * Note: The minus and multiply symbols are NOT dash (-) and x.
     * They are actual minus and multiply symbols (−,×).
     */
    if ((!ops) || (!ops.includes('a') && !ops.includes('s')
    && !ops.includes('m') && !ops.includes('d'))) {
      this.state.operators.push('+', '−', '×', '÷');
    } else {
      if (ops.includes('a')) {
        this.state.operators.push('+');
      }
      if (ops.includes('s')) {
        this.state.operators.push('−');
      }
      if (ops.includes('m')) {
        this.state.operators.push('×');
      }
      if (ops.includes('d')) {
        this.state.operators.push('÷');
      }
    }
    /**
     * Generate the math problems.
     * Push the problems to the expressions array and the solutions to the
     * solutions array.
     * If a generated problem is already in the expressions array,
     * don't iterate the loop because we want all problems to be unique.
     */
    for (let i = 0; i < this.state.numberOfProblems; i += 1) {
      const operatorRand = this.state.operators[Math.floor(Math.random()
         * this.state.operators.length)];
      let firstNumber;
      let secondNumber;
      let solution;
      if (operatorRand === '+') {
        firstNumber = Math.floor((Math.random() * ruleset[0]) + 1);
        secondNumber = Math.floor((Math.random() * ruleset[0]) + 1);
        solution = firstNumber + secondNumber;
      } else if (operatorRand === '−') {
        firstNumber = Math.floor((Math.random() * ruleset[1]) + 1);
        secondNumber = Math.floor((Math.random() * ruleset[1]) + 1);
        if (firstNumber - secondNumber < 0) {
          [firstNumber, secondNumber] = [secondNumber, firstNumber];
        }
        solution = firstNumber - secondNumber;
      } else if (operatorRand === '×') {
        firstNumber = Math.floor((Math.random() * ruleset[2]) + 1);
        secondNumber = Math.floor((Math.random() * ruleset[2]) + 1);
        solution = firstNumber * secondNumber;
      } else {
        const numberOne = Math.floor((Math.random() * ruleset[2]) + 1);
        const numberTwo = Math.floor((Math.random() * ruleset[2]) + 1);
        firstNumber = numberOne * numberTwo;
        while (firstNumber % secondNumber !== 0) {
          secondNumber = numberOne;
        }
        solution = firstNumber / secondNumber;
      }
      if (this.state.expressions.includes(`${firstNumber} ${operatorRand} ${secondNumber} =`)) {
        i -= 1;
      } else {
        this.state.expressions.push(`${firstNumber} ${operatorRand} ${secondNumber} =`);
        this.state.solutions.push(solution);
      }
    }
  },

  /**
   * Return the set of operators to a string format readable in HTML
   * @returns {string} - The string of the set
   */
  displayOps() {
    let mathOpsDisplay = '';
    for (let i = 0; i < this.state.operators.length; i += 1) {
      mathOpsDisplay += this.state.operators[i];
    }
    return mathOpsDisplay;
  },

  /**
   * The next four functions involve the game timer.
   *
   * startTimer(): Initiate the timer when the game begins
   * stopTimer(): Stop the timer when the game ends
   * timer(): Increment the timer by 0.1 seconds. This function
   * runs every 100 milliseconds.
   * timer2(): Extension to the timer() function to accurately
   * increment the timer
   */
  startTimer() {
    this.offset = Date.now();
    this.theTime = 0;
    this.theTimer = setInterval(() => { this.timer(); }, 100);
  },
  stopTimer() {
    clearInterval(this.theTimer);
  },
  timer() {
    this.theTime = this.theTime + this.timer2() / 1000;
    this.state.currentTime = this.theTime.toFixed(1);
  },
  timer2() {
    const now = Date.now();
    const d = now - this.offset;
    this.offset = now;
    return d;
  },

  /**
   * Reset the game state so a new game can be generated
   */
  clearGame() {
    this.state.numberOfProblems = 0;
    this.state.numberOfProblemsSolved = 0;
    this.state.expressions = [];
    this.state.solutions = [];
    this.state.difficulty = '';
    this.state.operators = [];
    this.state.currentTime = '0.0';
  },
};
