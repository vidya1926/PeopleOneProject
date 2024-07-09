import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';


const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
test(`Verify that the created certificate can be added to the course and is listed in the course/TP section on the Completion Certificate page`, async ({ adminHome, createCourse }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Verify that the created certificate can be added to the course and is listed in the course/TP section on the Completion Certificate page` },
        { type: `Test Description`, description: `the created certificate can be added to the course and is listed in the course/TP section on the Completion Certificate page` }
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :" + description);
    await createCourse.contentLibrary();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await createCourse.editcourse();
    await createCourse.clickCompletionCertificate();
    await createCourse.clickCertificateCheckBox();
    await createCourse.clickAdd();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage()
})