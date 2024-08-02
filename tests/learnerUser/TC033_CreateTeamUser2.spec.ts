import { test } from '../../customFixtures/expertusFixture';
import { readDataFromCSV } from '../../utils/csvUtil';
import { FakerData } from '../../utils/fakerUtils';


test(`TC033_Create Team User2`, async ({ adminHome, createUser ,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create Team User2` },
        { type: `Test Description`, description: `Verify that user is created as Team User2` }
    );   

        await adminHome.loadAndLogin("PEOPLEADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.verifyCreateUserLabel();
        await createUser.clickCreateUser();        
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username","Team__User2");
        await createUser.enter("user-password", "Welcome1@");
        await createUser.selectLanguage("English")
        await createUser.selectOtherManager();
        await createCourse.selectDomainOption("LearnerPortal")
        await createUser.clickSave();               
        await createUser.clickProceed("Proceed");
        await createUser.verifyUserCreationSuccessMessage();
    }
)


