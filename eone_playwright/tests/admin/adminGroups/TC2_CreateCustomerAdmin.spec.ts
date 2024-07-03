import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';

test.use({ storageState: "logins/expertusAdminLog.json" })
test(`TC004_CreateCustomerAdmin`, async ({ adminHome, adminGroup }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the user to add in SuperAdmin-Customer` },
        { type: `Test Description`, description: `Verify that user is added to SuperAdmin-Customer role` }

    );
    const login = "manager"; 

    await adminHome.menuButton();
    await adminHome.people();
    await adminHome.adminGroup();
    await adminGroup.searchAdmin("Commerce");
    await adminGroup.clickSuperadminCustomer();
    await adminGroup.searchUser("customadmin")
    await adminGroup.clickuserCheckbox("customadmin")
    await adminGroup.clickSelelctUsers();
    await adminGroup.clickUpdate();
})