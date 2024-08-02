import { test } from '../../customFixtures/expertusFixture';
import { readDataFromCSV } from '../../utils/csvUtil';
import { FakerData } from '../../utils/fakerUtils';


test(`TC031_Common User Ceation`, async ({ adminHome, createUser ,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create user for all portals` },
        { type: `Test Description`, description: `Verify that user is created for all portals` }
    );   

        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.verifyCreateUserLabel();
        await createUser.clickCreateUser();        
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username", FakerData.getUserId());
        await createUser.enter("user-password", "Welcome1@");
        await createUser.selectTimeZone("USA","Pacific Standard")
        await createUser.enterHireDate();
        await createUser.selectDepartmentType("department");
        await createUser.selectUserType("usertype")
        await createUser.selectjobTitle("jobtitle");      
        await createUser.clickSave();               
        await createUser.clickProceed("Proceed");
        await createUser.verifyUserCreationSuccessMessage();
    }
)


