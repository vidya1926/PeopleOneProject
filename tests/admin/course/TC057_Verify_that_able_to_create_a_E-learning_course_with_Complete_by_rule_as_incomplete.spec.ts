import { credentialConstants } from "../../../constants/credentialConstants";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { updateCronDataJSON } from "../../../utils/jsonDataHandler";
import { updateSingleInstanceAutoRegister } from "../DB/DBJobs";



const courseName = "Cron " + FakerData.getCourseName();
const user = credentialConstants.LEARNERUSERNAME
//test.use({ storageState: "logins/expertusAdminLog.json"})
test(`TC057_E-learning course with Complete by rule`, async ({ adminHome, createCourse, editCourse, createUser }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `E-learning course with Complete by rule` },
        { type: `Test Description`, description: `Verify that E-learning course with Complete by rule` }

    );

    const newData = {
        tc057: courseName
    }
    updateCronDataJSON(newData)
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
    await createCourse.selectCompleteByDate();
    await createCourse.contentLibrary();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await createCourse.editcourse();
    await editCourse.clickAccesstab();
    await createCourse.addSingleLearnerGroup(user);
    await createCourse.saveAccessButton();
    await editCourse.clickClose();
    await editCourse.clickAccessSetting();
    await editCourse.setCourseMandatory();
    await editCourse.clickSaveButton();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage()
})


test(`Test to execute CRON JOB`, async ({ }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Test to execute CRON JOB` },
        { type: `Test Description`, description: `Verify the CRON Job` }
    );

    await updateSingleInstanceAutoRegister();

})


