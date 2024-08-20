
import { test } from "../../customFixtures/expertusFixture";
import data from "../../data/cronjob.json"
test(`TC058_Verify_that_for_the_compliance_course_when _the_complete_by_rule_is_set_as_overdue.spec.ts`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Veriy a certification expiration` },
        { type: `Test Description`, description: `Verify from learner side` }

    );
    const course = data.tc058
    await learnerHome.learnerLogin("LEARNERUSERNAME", "LeanrerPortal");
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(course);
    await catalog.verifyCompletedCourse(course);
    await catalog.verifyOverdue(course);

})