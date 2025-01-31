import { test } from "../../../customFixtures/expertusFixture"
import { updateJiraIssue } from "../../../jira/jira-integration";
import { logADefectInJira } from "../../../jira/log-a-defect";
import { FakerData } from '../../../utils/fakerUtils';

 const roleName=FakerData.getFirstName()+" Admin"


test(`TC016 _Verify the Custom role creation with all privileges `, async ({ adminHome, adminGroup,adminRoleHome}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `Testcase`, description: `Verify the Custom role creation` },
        { type: `Test Description`, description: `Verify the Custom role creation` }
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton()
    await adminHome.people();
    await adminHome.clickAdminRole()
    await adminRoleHome.clickAddAdminRole()
    await adminRoleHome.enterName(roleName);
    await adminRoleHome.clickAllPriveileges();
    await adminRoleHome.clickSave()
    await adminRoleHome.verifyRole(roleName)        
})


test.skip(`TC017 _Verify Role Search functionality`, async ({ adminHome,adminRoleHome}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the ` },
        { type: `Test Description`, description: `Verify that Learner Group is created` }
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton()
    await adminHome.people();
    await adminHome.clickAdminRole()
    await adminRoleHome.roleSearch(roleName)
    await adminRoleHome.verifyRole(roleName)        
})
