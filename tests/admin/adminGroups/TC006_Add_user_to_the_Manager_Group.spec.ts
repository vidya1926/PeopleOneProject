import { credentialConstants } from "../../../constants/credentialConstants";
import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from '../../../utils/fakerUtils';
import { updateFieldsInJSON } from "../../../utils/jsonDataHandler";


const managerName:any=FakerData.getUserId();
const firstName=FakerData.getFirstName();
const lastName=FakerData.getLastName();
const newData = {
    managerName: managerName
}
updateFieldsInJSON(newData)
test(`Add_user_to_the_Manager_Group`, async ({ adminHome, createUser }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Add_user_to_the_Manager_Group` },
        { type:`Test Description`, description: `Create User as Manager` }
        
    );
    
    const csvFilePath = './data/User.csv';
    const data = await readDataFromCSV(csvFilePath);

    for (const row of data) {
         const { country, state, timezone, currency, city, zipcode } = row;

        await adminHome.clickMenu("User");
        await createUser.verifyCreateUserLabel("CREATE USER");
        await createUser.enter("first_name",firstName);
        await createUser.enter("last_name",lastName);
        await createUser.enter("username",managerName);
        await createUser.enter("user-password", "Welcome1@");
        await createUser.enter("email", FakerData.getEmail());
        await createUser.enter("user-phone", FakerData.getMobileNumber());
        await createUser.typeAddress("Address 1", FakerData.getAddress());
        await createUser.typeAddress("Address 2", FakerData.getAddress());
        await createUser.select("Country", country);
        await createUser.select("State/Province", state);
        await createUser.select("Time Zone", timezone);
        await createUser.select("Currency", currency);
        await createUser.enter("user-city", city);
        await createUser.enter("user-zipcode", zipcode);
        await createUser.enter("user-mobile", FakerData.getMobileNumber());
        await createUser.clickRolesButton("Manager")
        await createUser.clickSave();
        await createUser.clickProceed("Proceed");
        await createUser.verifyUserCreationSuccessMessage();
    }

   
  
});