import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';


test.skip(`TC026 _Create LeanerGroup-1 `, async ({ adminHome, adminGroup }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the Learner Group -1` },
        { type: `Test Description`, description: `Verify that Learner Group is created` }

    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.people();
    await adminHome.adminGroup();
    
})