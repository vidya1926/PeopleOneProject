// const count = 6
// for (let index = 0; index < 20; index++) {
//     const randomIndex = Math.floor(Math.random() * (count)) + 2;
//     console.log(randomIndex);

import { FakerData } from "./utils/fakerUtils";

    
// }

function getCurrentDateFormatted(): string {
    const date = new Date();
    const month = String(date.getMonth() + 1) 
    console.log(month);
    const day = String(date.getDate())
    console.log(day)
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}
//getCurrentDateFormatted()


for (let index = 0; index < 10; index++) {
    console.log(FakerData.getCourseName());
}

//const arry:any =[ { 'NOW()': 2024-07-11T10:44:06.000Z } ]