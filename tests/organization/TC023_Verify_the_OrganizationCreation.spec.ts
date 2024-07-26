import { test } from '../../customFixtures/expertusFixture';
import { readDataFromCSV } from '../../utils/csvUtil';
import { FakerData } from '../../utils/fakerUtils';

const OrgName=FakerData.getOrganizationName()
test(`TC023_Create Verigy the Organization is created`, async ({ adminHome,organization}) => {
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
   }
)


