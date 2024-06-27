import { faker } from "@faker-js/faker";
import path from "path";
import fs from 'fs'


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

    static jobRole(): string {
        return faker.person.jobTitle();
    }

    static getTagNames() {
        const techTerm = faker.hacker.noun();
        return techTerm;
    }

    static getLocationName() {
        const location = faker.location.street();
        return location;
    }



    static getCourseName(): string {
        const adjective = faker.hacker.adjective();
        const noun = faker.hacker.noun();
        const verb = faker.hacker.verb();
        return `${capitalizeFirstLetter(adjective)} ${capitalizeFirstLetter(noun)} ${capitalizeFirstLetter(verb)}`;
    }

    static getUserId(): string {
        const currentDate = new Date();
        const milliseconds = currentDate.getTime().toString();
        const user = faker.person.firstName() + milliseconds
        return user;
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
    static getMaxseats(){
      return  faker.number.int({min:20})
    }

    static getPrice():string{
        return faker.commerce.price()
    }

    static getMeetingUrl():string{
             return  faker.internet.url();    

    }


}
    
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getPhoneNumber(): string {
    const startDigit = Math.floor(Math.random() * 3) + 7;
    const restDigits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
    return `${startDigit}${restDigits}`;
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
export function getCurrentDateFormatted(): string {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}





