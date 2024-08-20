import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { updateCronDataJSON } from "../../../utils/jsonDataHandler";
import { courseEnrollmentCron } from "../DB/DBJobs";


const courseName = ("Cron" + FakerData.getCourseName());
test.describe(`TC058_Verify_that_for_the_compliance_course_when _the_complete_by_rule_is_set_as_overdue.spec.ts`, async () => {
    test(`TC058_Verify_that_for_the_compliance_course_set_as_overdue`, async ({ adminHome, createCourse }) => {
        const newData = {
            tc058: courseName
        }
        updateCronDataJSON(newData)
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `E-learning course with Complete by rule for Overdue` },
            { type: `Test Description`, description: `Verify that E-learning course with Complete by rule` }

        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + courseName);
        await createCourse.clickregistrationEnds();
        await createCourse.selectCompleteByRule();
        await createCourse.selectDate();
        await createCourse.selectPostCompletebyOverDue();
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();
    })


    test(`TC058_Learner Verification For Single Instance`, async ({ learnerHome, catalog }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `TC058_Verify_that_for_the_compliance_course_set_as_overdue` },
            { type: `Test Description`, description: `Verify_that_for_the_compliance_course_set_as_overdue` }
        );
        await learnerHome.learnerLogin("LEARNERUSERNAME", "Default Portal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(courseName);
        await catalog.clickEnrollButton();
        await catalog.viewCoursedetails();


    })


    test(`Test to execute CRON JOB`, async ({ }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Test to execute CRON JOB` },
            { type: `Test Description`, description: `Verify the CRON Job` }
        );

        await courseEnrollmentCron();

    })

})