import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const title = FakerData.getRandomTitle();
test(`Verify the  banner in sequence`, async ({ adminHome, bannerHome, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Verify banner in sequence` },
        { type: `Test Description`, description: `Verify that banner is created` }
    );
    
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.clickCommunicationLink()
    await adminHome.clickBanner();
    await adminHome.clickCreateBanner()
    await bannerHome.enterBannerTitile(title)
    await bannerHome.enterFromDate();
    await bannerHome.enterToDate();
    await bannerHome.selectSequence(2);
    await createCourse.selectPortal();
    await bannerHome.uploadImage("Profilepic");
    await bannerHome.enterbannerUrl();
    await bannerHome.clickPublish();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage()   

})


test(`Verification from learner site`, async ({ learnerHome }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `TC77_Learner Side Banner verification` },
        { type: `Test Description`, description: `Learner Side Banner verification` }
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME","LearnerPortal");
    await learnerHome.verifySequence(title,2);
    })