function generateProblem() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    if (operator === '-' && num1 < num2) {
      [num1, num2] = [num2, num1];
    }
    const problem = `${num1} ${operator} ${num2}`;
    const answer = operator === '+' ? num1 + num2 : num1 - num2;
    console.log(`Problem: ${problem}`);
    console.log(`Answer: ${answer}`);
  }
  
  // Generate a problem
  generateProblem();
  