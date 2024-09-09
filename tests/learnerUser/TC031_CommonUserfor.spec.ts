import { test } from '../../customFixtures/expertusFixture';
import { readDataFromCSV } from '../../utils/csvUtil';
import { FakerData } from '../../utils/fakerUtils';
import { updateFieldsInJSON } from '../../utils/jsonDataHandler';



const username = FakerData.getUserId();


test(`TC031a_Common User Ceation with Internal User type`, async ({ adminHome, createUser ,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create user for all portals` },
        { type: `Test Description`, description: `Verify that user is created for all portals` }
    );   
    const newData = {
        internalUser: username
    };
    updateFieldsInJSON(newData)
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
               await createUser.clickCreateUser();     
               await createUser.verifyCreateUserLabel();   
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username", username);
        await createUser.enter("user-password", "Welcome1@");
        await createUser.selectTimeZone("USA","Pacific Standard")
        await createUser.enterHireDate();
        await createUser.selectDepartmentType("department");
        await createUser.selectLanguage("English")
        await createUser.organizationType("Internal")
        await createUser.selectUserType("usertype")
        await createUser.selectjobTitle("jobtitle");    
        await createUser.selectManager("manager")  
        await createUser.clickSave();               
        await createUser.clickProceed("Proceed");
        await createUser.verifyUserCreationSuccessMessage();
    }
)



test(`TC031b_Common User Ceation external User type`, async ({ adminHome, createUser ,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create user for all portals` },
        { type: `Test Description`, description: `Verify that user is created for all portals` }
    );   


    const exusername = FakerData.getUserId();
    const newData = {
        externalUser: exusername
    };
    updateFieldsInJSON(newData)
    

        await adminHome.loadAndLogin("CUSTOMERADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
               await createUser.clickCreateUser();     
               await createUser.verifyCreateUserLabel();   
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username", exusername);
        await createUser.enter("user-password", "Welcome1@");
        await createUser.selectTimeZone("USA","Pacific Standard")
        await createUser.enterHireDate();
        await createUser.selectDepartmentType("department");
        await createUser.selectLanguage("English")
        await createUser.organizationType("External")
        await createUser.selectUserType("usertype")
        await createUser.selectjobTitle("jobtitle");    
        await createUser.selectManager("manager")  
        await createUser.clickSave();               
        await createUser.clickProceed("Proceed");
        await createUser.verifyUserCreationSuccessMessage();
    }
)

