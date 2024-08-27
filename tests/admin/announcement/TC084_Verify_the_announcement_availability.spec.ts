import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { updatetableForAnnoncement } from "../DB/DBJobs";
const title = FakerData.getRandomTitle();

test(`TC_084_Verify the  announcement is created with past date`, async ({ adminHome, announcementHome, bannerHome, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Verify Annoucement is created` },
        { type: `Test Description`, description: `Verify that banner is created` }
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.clickCommunicationLink();
    await adminHome.clickAnnouncement();
    await adminHome.clickCreateAnnouncement();
    await createCourse.enter("announcement-title", title)
    await announcementHome.enterDesc("Announcement !!!  " + title)
    await announcementHome.clickPriority();
    await createCourse.selectPortalOption();
    await announcementHome.dateFromTo();
    await bannerHome.clickPublish();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await updatetableForAnnoncement();
})

test(`Verification from learner site`, async ({ learnerHome }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `TC84_Learner Side announcement  verification` },
        { type: `Test Description`, description: `Learner Side announcement verification` }
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
    await learnerHome.verifypastAnnouncement(title);
})

