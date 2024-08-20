import { test } from "../../customFixtures/expertusFixture";
import data from "../../data/cronjob.json"

test(`Verification_learner_Side_for_the_certification_compliance_flow`, async ({ learnerHome, dashboard, catalog }) => {
   
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Veriy a certification expiration` },
        { type: `Test Description`, description: `Verify from learner side` }
    );
    let title = data.tc073
    await learnerHome.learnerLogin("LEARNERUSERNAME", "LearnerPortal");
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    await dashboard.searchCertification(title);
    await dashboard.verifyComplianceCourse()
})