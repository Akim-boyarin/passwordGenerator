// passwordGeneratorWithConditions

function generatePassword(length = 12, conditionsOfGeneration) {
    // определение исходных данных и условий

    // исходные данные
    let digits = "0123456789",
        letters = "abcdefghijklmnopqrstuvwxyx",
        specialSymbol = "_",
        nothingValue = "-- // --";

    // базовые условия генерации пароля
    // let conditionsOfGeneration = {
    //     digits: false,
    //     specialSymbols: false,
    //     bigLetters: false,
    //     smallLetters: false,
    // };

    // производные условия генерации пароля
    let areLetters = conditionsOfGeneration.bigLetters || conditionsOfGeneration.smallLetters, // наличие любых букв
        areDigits = conditionsOfGeneration.digits, // наличие цифр
        areSpecialSymbols = conditionsOfGeneration.specialSymbols; // наличие специальных символов

    let noLetters = !conditionsOfGeneration.bigLetters && !conditionsOfGeneration.smallLetters, // отсутствие букв
        onlyBigLetters = conditionsOfGeneration.bigLetters && !conditionsOfGeneration.smallLetters, // наличие только больших букв
        onlySmallLetters = !conditionsOfGeneration.bigLetters && conditionsOfGeneration.smallLetters, // наличие только маленьких букв
        areAllLetters = conditionsOfGeneration.bigLetters && conditionsOfGeneration.smallLetters; // наличие всех букв

    let areNothing = noLetters && !areDigits && !areSpecialSymbols, // полное отсутствие символов

        areOnlyDigits = areDigits && noLetters && !areSpecialSymbols, // наличие только цифр
        areOnlyletters = !areDigits && areLetters && !areSpecialSymbols, // наличие только букв
        areOnlySpecialSymbols = !areDigits && noLetters && areSpecialSymbols, // наличие только специальных символов

        areDigitsAndLetters = areDigits && areLetters && !areSpecialSymbols, // наличие цифр и букв
        areLettersAndSpecialSymbols = !areDigits && areLetters && areSpecialSymbols, // наличие букв и специальных символов
        areDigitsAndSpecialSymbols = areDigits && noLetters && areSpecialSymbols, // наличие цифр и специальных символов


        areAllConditions = areLetters && areDigits && areSpecialSymbols; // наличие всех символов

    // определение количества компонентов, задание позиций, и генерация пароля

    // если нет цифр, и нет букв, и нет специальных символов
    if (areNothing) return nothingValue;

    // определение количества различных символов и их позиций

    let numbersOfSymbols = {
            digits: 0,
            letters: 0,
            specialSymbols: 0,
        },
        positionsOfSymbols = {
            digits: [],
            letters: [],
            specialSymbols: [],
        };

    // если только цифры
    if (areOnlyDigits) {
        numbersOfSymbols.digits = length;
        positionsOfSymbols.digits = getAllNonNegativeIntegersListFromZeroToBeforeCurrent(length);
    }
    // если только буквы
    if (areOnlyletters) {
        numbersOfSymbols.letters = length;
        positionsOfSymbols.letters = getAllNonNegativeIntegersListFromZeroToBeforeCurrent(length);
    }
    // если только специальные символы
    if (areOnlySpecialSymbols) {
        numbersOfSymbols.specialSymbols = length;
        positionsOfSymbols.specialSymbols = getAllNonNegativeIntegersListFromZeroToBeforeCurrent(length);
    }

    // если есть цифры, и есть буквы
    if (areDigitsAndLetters) {
        numbersOfSymbols.digits = calculateNumberOfDigits(length);
        numbersOfSymbols.letters = length - numbersOfSymbols.digits;
        positionsOfSymbols.digits = getRandomSmallerNumbersList(length, numbersOfSymbols.digits);
        positionsOfSymbols.letters = getAllNonNegativeIntegersListFromZeroToBeforeCurrent(length).filter(position => !(positionsOfSymbols.digits).includes(position));
    }
    // если есть буквы и есть специальные символы
    if (areLettersAndSpecialSymbols) {
        numbersOfSymbols.specialSymbols = calculateNumberOfSpecialSymbols(length);
        numbersOfSymbols.letters = length - numbersOfSymbols.specialSymbols;
        do {
            positionsOfSymbols.specialSymbols = getRandomSmallerNumbersList(length, numbersOfSymbols.specialSymbols, areSpecialSymbols);
        } while (areAdjacentNumbersInTheList(positionsOfSymbols.specialSymbols));
        positionsOfSymbols.letters = getAllNonNegativeIntegersListFromZeroToBeforeCurrent(length).filter(position => !(positionsOfSymbols.specialSymbols).includes(position));
    }
    // если есть цифры, и есть специальные символы
    if (areDigitsAndSpecialSymbols) {
        numbersOfSymbols.specialSymbols = calculateNumberOfSpecialSymbols(length);
        numbersOfSymbols.digits = length - numbersOfSymbols.specialSymbols;
        do {
            positionsOfSymbols.specialSymbols = getRandomSmallerNumbersList(length, numbersOfSymbols.specialSymbols, areSpecialSymbols);
        } while (areAdjacentNumbersInTheList(positionsOfSymbols.specialSymbols));
        positionsOfSymbols.digits = getAllNonNegativeIntegersListFromZeroToBeforeCurrent(length).filter(position => !(positionsOfSymbols.specialSymbols).includes(position));
    }

    // если есть цифры, есть буквы, и есть специальные символы
    if (areAllConditions) {
        numbersOfSymbols.digits = calculateNumberOfDigits(length);
        numbersOfSymbols.specialSymbols = calculateNumberOfSpecialSymbols(length);
        numbersOfSymbols.letters = length - (numbersOfSymbols.digits + numbersOfSymbols.specialSymbols);
        positionsOfSymbols.digits = getRandomSmallerNumbersList(length, numbersOfSymbols.digits);
        do {
            positionsOfSymbols.specialSymbols = getRandomSmallerNumbersList(length, numbersOfSymbols.specialSymbols, areSpecialSymbols);
        } while (isACommonMemberInLists(positionsOfSymbols.digits, positionsOfSymbols.specialSymbols) || areAdjacentNumbersInTheList(positionsOfSymbols.specialSymbols));
        positionsOfSymbols.letters = getAllNonNegativeIntegersListFromZeroToBeforeCurrent(length).filter(position => !((positionsOfSymbols.digits).concat(positionsOfSymbols.specialSymbols)).includes(position));
    }

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
}



// рассчитать количество цифр
function calculateNumberOfDigits(length) {
    return Math.ceil(length / 3.5);
}

// рассчитать количество специальных символов
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

// узнать, есть ли общий член у двух списков
function isACommonMemberInLists(firstList, secondList) {
    for (let i = 0; i < firstList.length; i++) {
        for (let j = 0; j < secondList.length; j++) {
            if (firstList[i] === secondList[j]) return true;
        }
    }

    return false;
}

// узнать, есть ли в списке целых чисел соседние по значению члены
function areAdjacentNumbersInTheList(numbers) {
    let currentList = numbers.sort((a, b) => a - b);

    for (let i = 0; i < currentList.length; i++) {
        if (currentList[i] === currentList[i + 1] - 1) return true;
    }
    return false;
}

// получить список целых неотрицательных чисел от нуля до данного, не включая данного
function getAllNonNegativeIntegersListFromZeroToBeforeCurrent(number) {
    if (number !== Math.floor(number) || number <= 0) return [];

    let listOfNumbers = [];
    for (let i = 0; i < number; i++) listOfNumbers.push(i);
    return listOfNumbers;
}

// получить случайный элемент исходной строки или массива
function getRandomSymbol(source) {
    return source[Math.floor(Math.random() * source.length)];
}


// let passwordLength = 12;
// let conditionsOfGeneration = {
//     digits: false,
//     specialSymbols: false,
//     bigLetters: false,
//     smallLetters: false,
// };

// console.log(generatePassword(passwordLength, conditionsOfGeneration));
// console.log(generatePassword(passwordLength, conditionsOfGeneration));
// console.log(generatePassword(passwordLength, conditionsOfGeneration));