import { test } from '../../customFixtures/expertusFixture'
import { FakerData } from '../../utils/fakerUtils';
import { readDataFromCSV } from '../../utils/csvUtil';
import { updateFieldsInJSON } from '../../utils/jsonDataHandler';


const commonUser = FakerData.getUserId();
const newData = {
    commonUser: commonUser
}
updateFieldsInJSON(newData)

//test.use({ storageState: "logins/expertusAdminLog.json" })
test(`Creating User for the application`, async ({ page,adminHome, createUser, learnerHome, profile }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Vidya' },
        { type: 'TestCase', description: 'One Profile Training Summary' },
        { type: 'Test Description', description: "Verifying user open One Profile Training Summary" }
    );

    const csvFilePath = './data/User.csv';
    const data = await readDataFromCSV(csvFilePath);

    for (const row of data) {
        const { country, state, timezone, currency, city, zipcode } = row;
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.verifyCreateUserLabel("CREATE USER");
        await createUser.clickCreateUser();
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username", commonUser);
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
        await createUser.enter("user-employee-id", FakerData.getEmployeeid())
        await createUser.selectLanguage("English")
        await createUser.clickSave();
        await createUser.clickProceed("Proceed");
        await createUser.verifyUserCreationSuccessMessage();
       
        await learnerHome.learnerLogin("COMMONUSER", "Portal");
        await profile.clickProfile();
        await profile.oneProfile();
        await profile.verifyprofileInfo("Employee Id")
        await profile.verifyprofileInfo("Division")
        await profile.verifyprofileInfo("Email")
        await profile.verifyprofileInfo("Phone")
    }

    })



