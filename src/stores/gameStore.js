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
  getOneThird() {
    return Math.floor(this.state.numberOfProblems / 3);
  },
  getTwoThirds() {
    return Math.floor(this.state.numberOfProblems / 3 * 2);
  },
  getNineTenth() {
    return Math.floor(this.state.numberOfProblems / 10 * 9);
  },
  createGame(diff, ops) {
    this.state.numberOfProblems = 3; // Change this number if you want to debug
    // Don't make it less than 1 (aka no game) or over 100 (since we don't
    // repeat expressions and some difficulty/operator combos only have
    // 100 possible expressions, risking an infinite loop)
    const ruleset = [];
    if (diff === 'simple') {
      this.state.difficulty = 'Simple';
      ruleset.push(10, 15, 10);
    } else {
      this.state.difficulty = 'Standard';
      ruleset.push(20, 30, 12);
    }
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
    // Note to devs: The minus and multiply symbols are NOT dash (-) and x.
    // They are actual minus and multiply symbols (−,×).
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
  displayOps() {
    let mathOpsDisplay = '';
    for (let i = 0; i < this.state.operators.length; i += 1) {
      mathOpsDisplay += this.state.operators[i];
    }
    return mathOpsDisplay;
  },
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
