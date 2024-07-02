import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const title = FakerData.getRandomTitle();
test(`Verify the  banner in sequence`, async ({ adminHome, bannerHome, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Verify banner in sequence` },
        { type: `Test Description`, description: `Verify that banner is created` }
    );
    await adminHome.menuButton();
    await adminHome.clickCommunicationLink()
    await adminHome.clickBanner();
    await bannerHome.clickEditIcon();
    await bannerHome.selectSequence(3);
    await createCourse.selectPortal();
    await bannerHome.clickUpdatebtn();
    await bannerHome.clickListing();
     await bannerHome.clickUnpublishtab();
     await bannerHome.clickDelete();
     await bannerHome.verifyDeleteMsg();    
    
})