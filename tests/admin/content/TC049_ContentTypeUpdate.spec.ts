import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";

const title=FakerData.getRandomTitle();
test(`TC049_Content type update`, async ({ adminHome ,contentHome,bannerHome,createCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create banner in sequence` },
        { type: `Test Description`, description: `Verify that banner is created` }
    );
    
    await adminHome.loadAndLogin("LEARNERADMIN");
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickContentmenu();
    await contentHome.clickCreateContent();
    await contentHome.enter("content-title",title)
    await contentHome.enterDescription("AICC Content for " +title);
    await contentHome.uploadContent();
    await contentHome.verifyContentType();

  
   })


