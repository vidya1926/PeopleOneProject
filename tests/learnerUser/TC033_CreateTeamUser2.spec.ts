import { credentials } from '../../constants/credentialData';
import { URLConstants } from '../../constants/urlConstants';
import { test } from '../../customFixtures/expertusFixture';
import { FakerData } from '../../utils/fakerUtils';
import { updateFieldsInJSON } from '../../utils/jsonDataHandler';


const username = FakerData.getUserId();
const newData = {
    teamUser2: username
};
updateFieldsInJSON(newData)

test(`TC033_Create Team User2`, async ({ adminHome, createUser ,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create Team User2` },
        { type: `Test Description`, description: `Verify that user is created as Team User2` }
    );   

        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();      
        await createUser.clickCreateUser();
        await createUser.verifyCreateUserLabel();        
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username",username);
        await createUser.enter("user-password", "Welcome1@");
        await createUser.selectLanguage("English")
        await createUser.selectSpecificManager(credentials.MANAGERNAME.username);
        // await createCourse.selectDomainOption(URLConstants.portal2)
        await createUser.clickSave();               
        await createUser.clickProceed("Proceed");
        await createUser.verifyUserCreationSuccessMessage();
    }
)


