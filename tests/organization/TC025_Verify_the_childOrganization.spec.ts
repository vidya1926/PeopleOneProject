import { expect } from '@playwright/test';
import { test } from '../../customFixtures/expertusFixture';
import { FakerData } from '../../utils/fakerUtils';

const OrgName=FakerData.getOrganizationName()+" "+FakerData.getLastName()

test(`TC025_Create Verigy the Organization is created`, async ({ adminHome,createCourse,contentHome,organization,CompletionCertification}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create Team User1` },
        { type: `Test Description`, description: `Verify that user is created as Team User1` }
    );   

        
    await adminHome.loadAndLogin("PEOPLEADMIN");
    await adminHome.menuButton();
    await adminHome.people();
    await organization.organizationMenu()
    await organization.createOrganization();   
    await organization.enterName(OrgName);
    await organization.typeDropdown();
    await organization.typeDescription();
    await organization.clickSave();
    await CompletionCertification.clickProceed();
    await contentHome.gotoListing()
    const org:any=await organization.childOrgCount(OrgName);
    await organization.clickEditIcon(); 
    await organization.enterParentOrg(OrgName);
    await organization.enterContactName();
    await organization.clickUpdate();
    await createCourse.verifySuccessMessage();
    await contentHome.gotoListing()
    const org2:any=await organization.childOrgCount(OrgName);
    expect(org).toBeLessThan(org2)
  
}
    
)