import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from '../../../utils/fakerUtils';
import { updateFieldsInJSON } from "../../../utils/jsonDataHandler";


const enrollAdmin:any=FakerData.getUserId()
const newData = {
    enrollAdmin: enrollAdmin
}
updateFieldsInJSON(newData)
test.skip(`Create user in admin login `, async ({ adminHome, createUser }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Add user to the Course Admin` },
        { type:`Test Description`, description: `Adding User as Course Admin` }
        
    );
    
    const csvFilePath = './data/User.csv';
    const data = await readDataFromCSV(csvFilePath);

    for (const row of data) {
         const { country, state, timezone, currency, city, zipcode } = row;

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.clickMenu("User");
        await createUser.verifyCreateUserLabel();
        
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username", enrollAdmin);
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

