
import { faker } from "@faker-js/faker/locale/en_US";
function getQualification(){
    const qualification = {
        degree: faker.helpers.arrayElement(['Bachelor', 'Master', 'PhD', 'Certificate', 'Diploma']),
        fieldOfStudy: faker.helpers.arrayElement(['Computer Science', 'Engineering', 'Business', 'Arts', 'Science']),
        institution: faker.company.name(),
        graduationDate: faker.date.past(10).toLocaleDateString(),
        grade: faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E']),
      };

      return qualification;
      
}

console.log(getQualification())


function getFutureyear(daysAhead: number,monthsAhead:number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAhead);
  date.setMonth(date.getMonth() - monthsAhead);
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()+4);
  return `${month}/${day}/${year}`;
}

console.log(getFutureyear(10,5))



function getAwarsname(){
  const awardName=faker.helpers.arrayElement(["Excellency Award", "Leadership Award", "Trailblazer Award","Pioneer Award"])
 return awardName
}
 console.log(getAwarsname())