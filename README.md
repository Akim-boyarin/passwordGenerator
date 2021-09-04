# Password generator

This generator was realized using Vue.js and Bootstrap library.

The algorythm is based on pseudorandom number generator (**PRNG**) which is used in few moments of generation. We have three categories of symbols for future password: digits, lettters and special symbols.    

**Step 1**: we get numbers of symbols for each category. For example, we need a password and length of it is **14** symbols, we'll use all categories. Let's calculate numbers of them, these functions do it:    
```javascript
  // рассчитать количество цифр
  function calculateNumberOfDigits(length) {
      return Math.ceil(length / 3.5);
  }
  
  // расчитать количество специальных символов
  function calculateNumberOfSpecialSymbols(length) {
      let specialSymbols;

      let randomValue = coinToss() ? 1 : 0;
      if (length < 4) {
          specialSymbols = 0;
      } else if (length < 8) {
          specialSymbols = 1;
      } else if (length < 9) {
          specialSymbols = 2 - randomValue;
      } else if (length < 12) {
          specialSymbols = 2;
      } else if (length < 14) {
          specialSymbols = 3 - randomValue;
      } else if (length < 17) {
          specialSymbols = 3;
      } else if (length < 19) {
          specialSymbols = 4 - randomValue;
      } else if (length < 21) {
          specialSymbols = 4;
      } else if (length < 24) {
          specialSymbols = 5 - randomValue;
      } else if (length < 26) {
          specialSymbols = 5;
      } else if (length < 29) {
          specialSymbols = 6 - randomValue;
      } else if (length <= 30) {
          specialSymbols = 6;
      }

      return specialSymbols;
  }
  
  // орёл/решка
  function coinToss() {
      return (Math.floor(Math.random() * 2) === 0);
  }
```
Remaining quantity is number of letters. As we see, there's function coinToss(), which use **PRNG**. So, we have **4** ***digits***, **3** ***special symbols*** and **7** ***letters***.    

**Step 2**: we get positions in future password string for each category. To do it, we use next function:
```javascript
  // получить случайный список целых чисел, меньших чем данное, в количестве, равном второму аргументу, и без значений нуля и максимума для специальных символов
  function getRandomSmallerNumbersList(number, quantity, conditionOfSpecialSymbols = false) {
      if (quantity <= 0 || quantity >= number || quantity !== Math.floor(quantity)) return [];

      // для того, чтобы специальный символ не был первым или последним в пароле
      let currentNumber = conditionOfSpecialSymbols ? (number - 2) : number;

      let smallerNumbers = [];
      let counter = 0;
      while (counter < quantity) {
          let intermediateNumber = Math.random() * currentNumber;
          let smallerNumber = conditionOfSpecialSymbols ? Math.ceil(intermediateNumber) : Math.floor(intermediateNumber);
          if (!smallerNumbers.includes(smallerNumber)) {
              smallerNumbers.push(smallerNumber);
              counter++;
          }
      }

      return smallerNumbers;
  }
```
Our positions are **9, 2, 10, 7** for ***digits***, **4, 8, 12** for ***special symbols*** and **0, 1, 3, 5, 6, 11, 13** for ***letters***. As we see, all components in password's length are busy. This function uses **PRNG** too.    

**Step 3**: we get password string using data about positions. This part of code do it:
```javascript
    ...
    
    let password = "";
    
    for (let i = 0; i < length; i++) {
        let symbol;
        if ((positionsOfSymbols.specialSymbols).includes(i)) {
            symbol = specialSymbol;
        }
        if ((positionsOfSymbols.digits).includes(i)) {
            symbol = getRandomSymbol(digits);
        }
        if ((positionsOfSymbols.letters).includes(i)) {
            symbol = getRandomSymbol(letters);
            if (onlyBigLetters) {
                symbol = symbol.toUpperCase();
            }
            if (onlySmallLetters) {
                symbol = symbol;
            }
            if (areAllLetters) {
                symbol = coinToss() ? symbol.toUpperCase() : symbol;
            }
        }

        password += symbol;
    }

    return password;
    ...

    // also
    function getRandomSymbol(source) {
        return source[Math.floor(Math.random() * source.length)];
    }

```
We also use function getRandomSymbol(...), work of it is based of the **pseudorandom number generator** too. These are moments where **PRNG** is used in the algorythm. In result we get quite good passwords.    
Our password: **tN7j_bh1_74b_F**. Congratulations!


[:arrow_forward: run application :arrow_forward:](https://akim-boyarin.github.io/passwordGenerator/)
