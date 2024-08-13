// const count = 2
// for (let index = 0; index < 10; index++) {
//     const randomIndex = Math.floor(Math.random() * (count)) + 1;
//     console.log(randomIndex);
// }
// import { FakerData } from "./utils/fakerUtils";


// // }

// function getCurrentDateFormatted(): string {
//     const date = new Date();
//     const month = String(date.getMonth() + 1) 
//     console.log(month);
//     const day = String(date.getDate())
//     console.log(day)
//     const year = date.getFullYear();
//     return `${month}/${day}/${year}`;
// }
// //getCurrentDateFormatted()


// for (let index = 0; index < 10; index++) {
//     console.log(FakerData.getCourseName());
// }

//const arry:any =[ { 'NOW()': 2024-07-11T10:44:06.000Z } ]

/* function generateRandomNumbers(): number[] {
    let count =50
    const numbers: number[] = [];

    for (let i = 0; i < count; i++) {
        const randomNumber = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
        numbers.push(randomNumber);
    }

    return numbers;
}

// Example usage: Generate 50 random numbers between 50 and 100
const randomNumbers = generateRandomNumbers();
console.log(randomNumbers); */


/* 
function generateRandomNumber(): number {
    return Math.floor(Math.random() * (100 - 50 + 1)) + 50;
}

// Example usage: Generate one random number between 50 and 100
const randomNumber = generateRandomNumber();
console.log(randomNumber); */


/* function generateSpecificRangeNumber(): number {
    const min = 50;
    const max = 100;
    const step = 5;
    const range = Math.floor((max - min) / step) + 1;
    const randomMultiple = Math.floor(Math.random() * range) * step + min;
    return randomMultiple;
}

// Example usage: Generate one number within the range 50 to 100, multiples of 5
const specificRangeNumber = generateSpecificRangeNumber();
console.log(specificRangeNumber);
 */

/* const radioCount = 9

for (let index = 0; index < 10; index++) {
    const randomCount = Math.floor(Math.random() * Math.floor(radioCount / 2))+1 ; 
    if(randomCount !==2){
    console.log(randomCount);
    
    }
    // console.log(randomCount);
} */

// const oddIndices: number[] = [];
// for (let i = 1; oddIndices.length < randomCount; i += 2) {
//     oddIndices.push(i);
// }
// for (const index of oddIndices){
//     console.log(index);

// }



/* let count = 10;
let generatedNumbers: number[] = [];

for (let i = 0; i < 4; i++) {
    let randomIndex: number;
    do {
        randomIndex = Math.floor(Math.random() * count) + 1;
    } while (generatedNumbers.includes(randomIndex));
    
    generatedNumbers.push(randomIndex);
    console.log(randomIndex);
} */
// let count = 5;
// for (let i = 0; i < 4; i++) {
//     const randomIndex = Math.floor(Math.random() * (count - 1)) + 2;
//     console.log(randomIndex);
// }


/* 
    for (let i = 0; i < 15; i += 5) {
        let indexToClick = i + 1;
        if (indexToClick <= 15) {
           console.log(indexToClick -1);
           
        }
    } */

/* 
        let clickIndices: number[] = [];
        for (let i = 0; i < 15; i++) {
            clickIndices.push((i * 5) + 4);
        }

        for (let index of clickIndices) {
            if (index < 15) {
                console.log(index);
                
            }
        }
 */


/* for (let index = 0; index <= 10; index ++) {
    if (index % 2 == 0) {
        console.log(index);
    }
}
 */

/* let printedIndices: number[] = []; 
for (let i = 0; i < 2; i++) {
    console.log(i);
    for (let index = 0; index < 4; index++) {
        if (index % 2 === 0) {
            if (!printedIndices.includes(index)) {
                printedIndices.push(index);
                console.log(index);
                break;
            }

        }
    }
}
 */
/* 
const startDigit = Math.floor(Math.random() * 3) + 7;
const restDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
console.log(`${startDigit}${restDigits}`); */



/* const date = new Date();
    const month = String(date.getMonth() + 1)
    const day = String(date.getDate()+1);
    const year = date.getFullYear();
    console.log( `${month}/${day}/${year}`); */
/* for (let index = 0; index < 10; index++) {
    const min = 50;
    const max = 100;
    const step = 5;
    const range = Math.floor((max - min) / step) + 1;
    const randomMultiple = Math.floor(Math.random() * range) * step + min;
    console.log(randomMultiple);


} */
/* for (let index = 0; index < 30; index++) {
    console.log(Math.floor(Math.random() * (2))+1);

    
} */

/* let option=1
let rNum="anv"
    console.log(`(${option})[${rNum}]`); */
/* 
let a = ["Ajay", "Ajay", "Ajay", "Ajay"];
let count = a.filter(item => item === "Ajay").length;
console.log(count); // Output: 4
 */
// Add a count method to the Array prototype
Array.prototype.count = function (value) {
    return this.filter(item => item === value).length;
};

// Example usage
let a = ["Ajay", "Ajay", "Ajay", "Ajay"];
console.log(a.count()); // Output: 4
