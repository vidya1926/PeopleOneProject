import { expect } from "@playwright/test";
import { test } from "../../../customFixtures/expertusFixture"
import { readDataFromCSV } from "../../../utils/csvUtil";
import { FakerData } from "../../../utils/fakerUtils";

const username: any = ("people" + FakerData.getUserId());
test.describe(`People Module TC035,TC036,TC037 and TC039 `, async () => {
    test(`TC035_Verify that a user can be created and a profile picture uploaded`, async ({ adminHome, createUser }) => {

        test.info().annotations.push(
            { type: 'Author', description: 'Ajay Michael' },
            { type: 'TestCase', description: 'Verify that a user can be created and a profile picture uploaded' },
            { type: 'Test Description', description: "Creating a user can be creating with profile picture uploaded" }
        );

        const csvFilePath = './data/User.csv';
        const data = await readDataFromCSV(csvFilePath);

        for (const row of data) {
            const { country, state, timezone, currency, city, zipcode } = row;

            await adminHome.loadAndLogin("NEWCUSTOMERADMIN");
            await adminHome.clickMenu("User");
            await createUser.verifyCreateUserLabel();
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
        await adminHome.loadAndLogin("NEWCUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.userSearchField(username);
        await createUser.editIcon();
        await createUser.selectEmploymentType("emp_type");
        await createUser.clickRolesButton("Manager");
        await createUser.clickRolesButton("Instructor");
        await createUser.organizationType("Internal");
        await createUser.updateUser();
        await createUser.verifyUserCreationSuccessMessage();

    })

    test(` TC036_Verify that a user can be updated by adding new information to the fields (Edit)`, async ({ adminHome, createUser }) => {

        test.info().annotations.push(
            { type: 'Author', description: 'Ajay Michael' },
            { type: 'TestCase', description: 'Verify that a user can be updated by adding new information to the fields (Edit)' },
            { type: 'Test Description', description: "Try to edit created user" }
        );
        await adminHome.loadAndLogin("NEWCUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.userSearchField(username);
        await createUser.editIcon();
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("user-phone", FakerData.getMobileNumber());
        await createUser.typeAddress("Address 1", FakerData.getAddress());
        await createUser.typeAddress("Address 2", FakerData.getAddress());
        await createUser.updateUser();
        await createUser.verifyUserCreationSuccessMessage();

    })

    test(` TC037 Verify that a user can be suspended even if they have active or inactive enrollments`, async ({ adminHome, createUser }) => {

        test.info().annotations.push(
            { type: 'Author', description: 'Ajay Michael' },
            { type: 'TestCase', description: 'Verify that a user can be suspended even if they have active or inactive enrollments' },
            { type: 'Test Description', description: "Suspend the User" }
        );
        await adminHome.loadAndLogin("NEWCUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.userSearchField(username);
        await createUser.editIcon();
        await createUser.verifyEditUserLabel()
        await createUser.clickSuspendButton();
        await createUser.userSearchField(username);

    })
    test(` TC038 Verify that the impersonation flow in diffferent portal`, async ({ adminHome, createUser }) => {
/*  */
        test.info().annotations.push(
            { type: 'Author', description: 'Ajay Michael' },
            { type: 'TestCase', description: 'Verify that the impersonation flow in diffferent portal' },
            { type: 'Test Description', description: "IMpersonate the User to debug" }
        );
        await adminHome.loadAndLogin("NEWCUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.userSearchField(username);
        await createUser.clickActivateIcon();
        await createUser.clickImpersonationIcon();
        await createUser.fillImpersonateForm();


    })

    test(` TC039 Verify that a user without active enrollments can be deleted`, async ({ adminHome, createUser }) => {

        test.info().annotations.push(
            { type: 'Author', description: 'Ajay Michael' },
            { type: 'TestCase', description: 'Verify that a user without active enrollments can be deleted' },
            { type: 'Test Description', description: "Delete the User" }
        );
        await adminHome.loadAndLogin("NEWCUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.userSearchField(username);
        await createUser.clickDeleteIcon();
        await createUser.userSearchField(username);
        await createUser.verifyDeletedUser();

    })


})