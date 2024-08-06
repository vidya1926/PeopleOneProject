import { expect } from '@playwright/test';
import { test} from '../../customFixtures/expertusFixture';
import { readDataFromCSV } from '../../utils/csvUtil';
import { FakerData } from '../../utils/fakerUtils';


const username= FakerData.getUserId();

test(`TC034_Create USer for CRUD Operation`, async ({ adminHome, createUser ,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create User for CRUD Operation` },
        { type: `Test Description`, description: `Verify that user is created` }
    );   

        await adminHome.loadAndLogin("PEOPLEADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
       
        await createUser.clickCreateUser(); 
        await createUser.verifyCreateUserLabel();       
        await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.enter("username",username);
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



test(`TC034_Update User for CRUD Operation`, async ({ adminHome, createUser ,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Update User for CRUD Operation` },
        { type: `Test Description`, description: `Update User for CRUD Operation` }
    );   

        await adminHome.loadAndLogin("PEOPLEADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.userSearchField(username);
        await createUser.editIcon();
        const empType=await createUser.selectEmploymentType("emp_type")
        await createUser.updateUser();        
        await createUser.verifyUserCreationSuccessMessage();  
        await createUser.editbtn();    
        const empTypeUpdated= await createUser.selectEmploymentType("emp_type");        
        expect(empType).not.toContain(empTypeUpdated);

    }
)


test(`TC034_Delete User for CRUD Operation`, async ({ adminHome, createUser ,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Delete User for CRUD Operation` },
        { type: `Test Description`, description: `Delete User for CRUD Operation` }
    );   

        await adminHome.loadAndLogin("PEOPLEADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.user();
        await createUser.userSearchField(username);
        await createUser.clickdeleteIcon();
        await createUser.verifyUserdeleteSuccessMessage()
       
    }
)

