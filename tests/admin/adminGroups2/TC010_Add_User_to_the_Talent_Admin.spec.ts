import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from '../../../utils/fakerUtils';
import { updateFieldsInJSON } from "../../../utils/jsonDataHandler";


const courseAdmin: any = FakerData.getUserId()
const newData = {
    courseAdmin: courseAdmin
}
updateFieldsInJSON(newData)
test.skip(`Create user in admin login `, async ({ adminHome, createUser }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Add user to the Course Admin` },
        { type: `Test Description`, description: `Adding User as Course Admin` }

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
        await createUser.enter("username", courseAdmin);
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
});

test.skip(`Add user to the Course Admin`, async ({ adminHome, adminGroup, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Add user to the Course Admin` },
        { type: `Test Description`, description: `Adding User as Course Admin` }

    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.people();
    await adminHome.adminGroup();
    await adminGroup.searchUser("Talent");
    await adminGroup.clickGroup("Talent admin");
    await adminGroup.searchUser(courseAdmin)
    await adminGroup.clickCourseAdmin();
    await adminGroup.searchUser(courseAdmin);
    await adminGroup.clickUpdate();
    await createCourse.verifySuccessMessage();
})
