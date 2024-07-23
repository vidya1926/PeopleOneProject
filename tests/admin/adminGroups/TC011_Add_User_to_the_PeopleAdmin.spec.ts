
import { test } from "../../../customFixtures/expertusFixture"

test(`TC011 _Add user to People Admin `, async ({ adminHome, adminGroup }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the user to add in commerce` },
        { type: `Test Description`, description: `Verify that user is added to commerce role` }

    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.people();
    await adminHome.adminGroup();
    await adminGroup.searchAdmin("People");
    
})