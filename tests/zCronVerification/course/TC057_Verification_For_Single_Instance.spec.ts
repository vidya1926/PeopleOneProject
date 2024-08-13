
import { test } from "../../../customFixtures/expertusFixture";
import data from "../../../data/cronjob.json"
test(`TC056_Verification_Elearning_compliance_course.spec.ts`, async ({ learnerHome, dashboard, catalog }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Veriy a certification expiration` },
        { type: `Test Description`, description: `Verify from learner side` }

    );
    const title = data.tc057
    await learnerHome.learnerLogin("LEARNERUSERNAME", "LeanrerPortal");
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(title);
    await catalog.verifyCompletedCourse(title);

})