import { expect } from "@playwright/test";
import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from "../../../utils/fakerUtils";

const username: any = FakerData.getUserId();
test.describe(``, async () => {
    test(`Verify that a user can be created and a profile picture uploaded`, async ({ adminHome, createUser }) => {

        test.info().annotations.push(
            { type: 'Author', description: 'Ajay Michael' },
            { type: 'TestCase', description: 'Verify that a user can be created and a profile picture uploaded' },
            { type: 'Test Description', description: "Creating a user can be creating with profile picture uploaded" }
        );

        const csvFilePath = './data/User.csv';
        const data = await readDataFromCSV(csvFilePath);

        for (const row of data) {
            const { country, state, timezone, currency, city, zipcode } = row;

            await adminHome.loadAndLogin("CUSTOMERADMIN");
            await adminHome.clickMenu("User");
            await createUser.verifyCreateUserLabel("CREATE USER");
            await createUser.enter("first_name", FakerData.getFirstName());
            await createUser.enter("last_name", FakerData.getLastName());
            await createUser.enter("username", username);
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
            await createUser.userProfileUpload();
            await createUser.clickSave();
            await createUser.clickProceed("Proceed");
            await createUser.verifyUserCreationSuccessMessage();
        }
    })

    test(`Verify that the attributes created in the metadata library for people module is accessible in user page`, async ({ adminHome, createUser }) => {
        test.info().annotations.push(
            { type: 'Author', description: 'Ajay Michael' },
            { type: 'TestCase', description: 'Verify that the attributes created in the metadata library for people module is accessible in user page' },
            { type: 'Test Description', description: "Using the attributes created in the metadata library for people module " }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.userSearchField(username);
        await createUser.editIcon();
        await createUser.selectEmploymentType("emp_type");
        await createUser.updateUser();
        await createUser.verifyUserCreationSuccessMessage();
     

    })




})