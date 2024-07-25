import { faker } from "@faker-js/faker";
import path from "path";
import fs from 'fs'
import { promises } from "readline";


export class FakerData {

    static getFirstName(): string {
        return faker.person.firstName();
    }

    static getLastName(): string {
        return faker.person.lastName();
    }

    static getMobileNumber(): string {
        return getPhoneNumber();
    }

    static getEmail(): string {
        return faker.internet.email();
    }

    static getAddress(): string {
        return faker.location.streetAddress();
    }

    static addressName(): string {
        return `${faker.location.countryCode()} +" "+ ${faker.location.county()}`; 
    }

    static jobRole(): string {
        return faker.person.jobTitle();
    }

    static equipmentName(): string {
        return faker.commerce.productMaterial();
    }
    static getTagNames() {
        const techTerm = faker.hacker.noun();
        return techTerm;
    }
    static getLocationName() {
        const location = faker.location.street();
        return location;
    }
    static getcertificationTitle() {
        const title = faker.word.sample() + " " + faker.word.noun()
        return title;
    }
    static generateQuestion() {
        const question = (faker.lorem.sentence({ min: 4, max: 5 }) + " ?")
        return question
    }
    static getCourseName(): string {
        const adjective = faker.hacker.adjective();
        const noun = faker.hacker.noun();
        const verb = faker.hacker.verb();
        return `${capitalizeFirstLetter(adjective)} ${capitalizeFirstLetter(noun)} ${capitalizeFirstLetter(verb)}`;
    }
    static getUserId(): string {
        //const currentDate = new Date();
        //const milliseconds = currentDate.getTime().toString();
        const fName = faker.person.firstName();
        const user = faker.internet.email({ firstName: fName })
        return user;
    }

    static randomCityName():string{
        return faker.person.jobArea();
    }
    static getSession(): string {
        const session = faker.person.jobDescriptor()
        return session
    }
    static getDescription(): string {
        const description = faker.lorem.paragraph();
        return description;
    }
    static getCategory(): string {
        const category = faker.company.buzzVerb() + " " + faker.company.buzzNoun()
        return capitalizeFirstLetter(category);
    }
    static getMaxseats() {
        return faker.number.int({ min: 20 })
    }

    static getPrice(): string {
        return faker.commerce.price()
    }

    static getMeetingUrl(): string {
        return faker.internet.url();

    }
    static getRandomTitle() {
        return (faker.hacker.noun() +" " +faker.hacker.noun());
    }
}

export function getCreditCardNumber(): string {
    const startDigit = Math.floor(Math.random() * 3) + 7;
    const restDigits = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
    return `${startDigit}${restDigits}`;
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPhoneNumber(): string {
    const startDigit = Math.floor(Math.random() * 3) + 7;
    const restDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
    return `${startDigit}${restDigits}`;
}
export function getCVV(): string {
    const startDigit = Math.floor(Math.random() * 1) + 12;
    const restDigits = Array.from({ length: 1 }, () => Math.floor(Math.random() * 10)).join('');
    return `${startDigit}${restDigits}`;
}

export async function score() { 
const min = 50;
const max = 100;
const step = 5;
const range = Math.floor((max - min) / step) + 1;
const randomMultiple = Math.floor(Math.random() * range) * step + min;
return randomMultiple.toString();
    
}

export async function getRandomSeat() {
    const num = 100;
    const randomNumber = Math.floor(Math.random() * num) + 1;
    return randomNumber.toString();
}

type DataItem = string;
export function getRandomLocation(): DataItem | any {
    try {


        const filePath = path.join(__dirname, '../data/location.json');
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const dataArray: DataItem[] = JSON.parse(jsonData);
        if (!Array.isArray(dataArray) || dataArray.length === 0) {
            throw new Error('Data array is empty or not an array');
        }
        const randomIndex = Math.floor(Math.random() * dataArray.length);
        const randomValue = dataArray[randomIndex];
        return randomValue;
    } catch (error) {
        console.error('Error in getRandomDataItem:', error.message);
        return null;
    }
}
export function 
gettomorrowDateFormatted(): string {
    const date = new Date();
    const month = String(date.getMonth()+1)
    const day = String(date.getDate())
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

export function 
getCurrentDateFormatted(): string {
    const date = new Date();
    const month = String(date.getMonth() + 1)
    const day = String(date.getDate())
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}


export function getnextMonthFormatted(): string {
    const date = new Date();
    const month = String(date.getMonth() + 2) // getMonth() is zero-based
    const day = String(date.getDate() + 2)
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

export function getcardExpiryDate(): string {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0")// getMonth() is zero-based
    const year = date.getFullYear()
    const yy = year.toString().slice(2)
    return `${month}/${yy}`
}
export function getPonumber(): string {
    const startDigit = Math.floor(Math.random() * 3) + 12;
    const restDigits = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
    return `${startDigit}${restDigits}`;
}



