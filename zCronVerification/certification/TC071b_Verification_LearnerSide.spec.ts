import { test } from "../../customFixtures/expertusFixture";
import data from "../../data/cronjob.json"

test(`Recertify the expired certification`, async ({ learnerHome, dashboard, catalog }) => {
    
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Veriy a certification expiration` },
        { type: `Test Description`, description: `Verify from learner side` }
    );
    let title = data.tc071b
    await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    await dashboard.searchCertification(title);
    await dashboard.clickRecertifyIcon(title);
    await catalog.clickRecertify();


})