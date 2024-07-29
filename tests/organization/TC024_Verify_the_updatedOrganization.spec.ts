import { test } from '../../customFixtures/expertusFixture';



test(`TC024_Update the Organization`, async ({ adminHome,organization,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Update organization` },
        { type: `Test Description`, description: `Verify that able to edit and update the created organisation` }
    );   

        await adminHome.loadAndLogin("PEOPLEADMIN");
        await adminHome.menuButton();
        await adminHome.people();
        await organization.organizationMenu()
        await organization.clickEditIcon();
        await organization.enterContactName();
        await organization.clickUpdate();
        await createCourse.verifySuccessMessage();
      
   }
)


