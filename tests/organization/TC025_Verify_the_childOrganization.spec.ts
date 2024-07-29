import { test } from '../../customFixtures/expertusFixture';
import { FakerData } from '../../utils/fakerUtils';

const OrgName=FakerData.getOrganizationName()

test(`TC025_Create Verigy the Organization is created`, async ({ adminHome,organization,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create Team User1` },
        { type: `Test Description`, description: `Verify that user is created as Team User1` }
    );   

        
    await adminHome.loadAndLogin("PEOPLEADMIN");
    await adminHome.menuButton();
    await adminHome.people();
    await organization.organizationMenu()
    await organization.enterName(OrgName);
    await organization.typeDropdown();
    await organization.typeDescription();
    await organization.clickSave();
    //yet to complete
    await organization.childOrgCount();
    await organization.clickEditIcon(); 
    await organization.enterParentOrg(OrgName);
    await organization.enterContactName();
    await organization.clickUpdate();
    await createCourse.verifySuccessMessage();
    await organization.childOrgCount();
  
}
   
)