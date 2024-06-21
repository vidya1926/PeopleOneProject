import {faker} from "@faker-js/faker";


export class FakerData {

    static getFirstName():string{
        return faker.person.firstName();
    }

    static getLastName():string{
        return faker.person.lastName();
    }

    static getMobileNumber():string{
        return getPhoneNumber();
    }

    static getEmail():string{
        return faker.internet.email();
    }

    static getAddress():string{
        return faker.location.streetAddress();
    }

    static jobRole():string{
        return faker.person.jobTitle();
    }

    static getTagNames() {
        const techTerm = faker.hacker.noun();
        return techTerm;
    }
 

    static getCourseName():string{
        const adjective = faker.hacker.adjective();
        const noun = faker.hacker.noun();
        const verb = faker.hacker.verb();
        return `${capitalizeFirstLetter(adjective)} ${capitalizeFirstLetter(noun)} ${capitalizeFirstLetter(verb)}`;
    }

    static getUserId():string {
        const currentDate = new Date();
        const milliseconds = currentDate.getTime().toString();
        const user=  faker.person.firstName()+milliseconds
        return user;
    }

    static getSession():string{
        const session=faker.person.jobDescriptor()
        return session
    }
    static getDescription():string{
        const description=faker.lorem.paragraph();
        return description;
    }
    
    static getCategory():string{
        const category=faker.company.buzzVerb()+" "+faker.company.buzzNoun()
        return capitalizeFirstLetter(category);
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



