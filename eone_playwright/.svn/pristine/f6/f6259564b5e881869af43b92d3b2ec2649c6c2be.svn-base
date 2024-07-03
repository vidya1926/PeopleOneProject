import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';

test.use({ storageState: "logins/expertusCommerce.json" })
test(`TC012 _Add userto Commerce Admin `, async ({ adminHome, adminGroup }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the user to add in commerce` },
        { type: `Test Description`, description: `Verify that user is added to commerce role` }

    );
    const login = "manager"; 

    await adminHome.menuButton();
    await adminHome.people();
    await adminHome.adminGroup();
    await adminGroup.searchAdmin("Commerce");
    
})