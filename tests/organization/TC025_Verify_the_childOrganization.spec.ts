import { expect } from '@playwright/test';
import { test } from '../../customFixtures/expertusFixture';
import { FakerData } from '../../utils/fakerUtils';

const OrgName=FakerData.getOrganizationName()

test(`TC025_Verify the Organization is created with Parent Organization`, async ({ adminHome,createCourse,contentHome,organization,CompletionCertification}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Add Parent to the Organization` },
        { type: `Test Description`, description: `Verify the Organization is created with Parent Organization` }
    );           
    await adminHome.loadAndLogin("PEOPLEADMIN");
    await adminHome.menuButton();
    await adminHome.people();
    await organization.organizationMenu()
   
    async function createOrg(){
    let orgName=OrgName+" "+FakerData.getLastName();
    await organization.createOrganization();   
    await organization.enterName(orgName)
    await organization.typeDropdown();
    await organization.typeDescription();
    await organization.clickSave();
<<<<<<< HEAD
    await CompletionCertification.clickProceed();    
    return orgName  
    }
   const parentOrg= await createOrg();
    await contentHome.gotoListing();
    const childOrg=  await createOrg();
    await contentHome.gotoListing();
    const org:any=await organization.childOrgCount(parentOrg);
    await organization.clickEditIcon(); 
    await organization.enterParentOrg(parentOrg);
=======
    await CompletionCertification.clickProceed();
    await contentHome.gotoListing()
    const org:any=await organization.childOrgCount(OrgName);
    await organization.clickEditIcon(); 
    await organization.enterParentOrg(OrgName);
>>>>>>> ee1beea6f08ff44a21ae72693552f8802e7959e4
    await organization.enterContactName();
    await organization.clickUpdate();
    await createCourse.verifySuccessMessage();
    await contentHome.gotoListing()
<<<<<<< HEAD
    const org2:any=await organization.childOrgCount(parentOrg);
    expect(org).toBeLessThan(org2)  
=======
    const org2:any=await organization.childOrgCount(OrgName);
    expect(org).toBeLessThan(org2)
  
>>>>>>> ee1beea6f08ff44a21ae72693552f8802e7959e4
}
    
)
