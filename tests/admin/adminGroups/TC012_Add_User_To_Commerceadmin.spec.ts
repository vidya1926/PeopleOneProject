import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from '../../../utils/fakerUtils';
import { updateFieldsInJSON } from "../../../utils/jsonDataHandler";


const commerceAdmin:any=FakerData.getUserId()
const newData = {
    commerceAdmin: commerceAdmin
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
        await createUser.verifyCreateUserLabel("CREATE USER");
        
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username", commerceAdmin);
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



test.skip(`TC012 _Add user to Commerce Admin `, async ({ adminHome, adminGroup }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the user to add in commerce` },
        { type: `Test Description`, description: `Verify that user is added to commerce role` }

    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.people();
    await adminHome.adminGroup();
    await adminGroup.searchAdmin("Commerce");
    await adminGroup.clickCommerceAdmin();
    await adminGroup.searchUser("commerce")
    await adminGroup.clickuserCheckbox("commerceadmin")
    await adminGroup.clickSelelctUsers();
    await adminGroup.clickUpdate();    
})