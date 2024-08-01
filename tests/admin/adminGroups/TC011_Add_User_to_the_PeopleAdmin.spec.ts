
import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from "../../../utils/fakerUtils";
import { updateFieldsInJSON } from "../../../utils/jsonDataHandler";


const peopleAdmin:any=FakerData.getUserId();

const newData = {
    peopleAdmin: peopleAdmin
}
updateFieldsInJSON(newData)
test.skip(`Create user as  People Admin `, async ({ adminHome, createUser }) => {
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
        await createUser.enter("username", peopleAdmin);
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
        await createUser.selectLanguage("English")
        await createUser.clickSave();
        await createUser.clickProceed("Proceed");
        await createUser.verifyUserCreationSuccessMessage();
    }
});

test(`TC011 _Add user to People Admin `, async ({ adminHome, adminGroup,createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the user to add in People admin group` },
        { type: `Test Description`, description: `Verify that user is added to People admin group` }

    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.people();
    await adminHome.adminGroup();
    await adminGroup.searchAdmin("People");
    await adminGroup.clickPeopleAdmin();
    await adminGroup.searchUser(peopleAdmin);
    await adminGroup.clickUpdate();
    await createCourse.verifySuccessMessage();
    
})