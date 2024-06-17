import {test} from"../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from "../../../utils/fakerUtils";

const username: any =FakerData.getUserId();
test.use({ storageState: "logins/expertusAdminLog.json" })
test(`Creating User`,async({ adminHome, createUser })=>{

    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Creating User for the application' },
        { type:'Test Description', description:"Verifying user identity.Allowing updates to personal information.Setting roles and permissions"}
    );

    const csvFilePath = './data/User.csv';
    const data = await readDataFromCSV(csvFilePath);

    for (const row of data) {
         const { country, state, timezone, currency, city, zipcode } = row;

        await adminHome.clickMenu("User");
        await createUser.verifyCreateUserLabel("CREATE USER");
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username",username);
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
        await createUser.clickSave();
        await createUser.clickProceed("Proceed");
        await createUser.verifyUserCreationSuccessMessage();
       
    }
})

test(`Verify that a user can be created and a profile picture uploaded`,async({adminHome,createUser})=>{
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Verify that a user can be created and a profile picture uploaded' },
        { type:'Test Description', description:"Creating User and Uploading the profile picture"}
    );
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.userSearchField(username);
        await createUser.editIcon();
        await createUser.userProfileUpload();
        await createUser.updateUser();
        await createUser.verifyUserCreationSuccessMessage();       
})

test(`Verify that the attributes created in the metadata library for people module is accessible in user page`,async({})=>{
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Verify that the attributes created in the metadata library for people module is accessible in user page' },
        { type:'Test Description', description:"Creating the attributes accessible in the user page involves setting up the metadata library for the people module"}
    );
})