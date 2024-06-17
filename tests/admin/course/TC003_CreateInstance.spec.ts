import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';

test.use({ storageState: "logins/expertusAdminLog.json" })
test(`Course Creation for Classroom`, async ({ adminHome, createCourse, editCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ranjini` },
        { type: `TestCase`, description: `Create the course as multiple instance` },
        { type:`Test Description`, description: `Verify that course should be created as multiple instance when ILT or VC delivery type is chosen` }
        
    );
    var courseName = FakerData.getCourseName();

    await adminHome.clickMenu("Course");
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");  
    await createCourse.typeDescription("Description", "This is a new course by name :" + courseName); 
    await createCourse.clickSelect("A1 category10");   
    await createCourse.selectProvider("Reintermediate");
    await createCourse.selectTotalDuration("48");
    await createCourse.typeAdditionalInfo("Happy Learning!");
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.modifyTheAccess();
    await editCourse.clickClose();
    await editCourse.clickCourseMenu("Tags");
    await editCourse.selectTags("Empower");
    await editCourse.clickClose();
    await editCourse.clickCourseMenu("Completion Certificate");
    await editCourse.selectCourseCompletionCertificate("Playwright Automation");
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifyCourseCreationSuccessMessage();
    await createCourse.clickEditCourseTabs("Edit Course");
    await createCourse.addInstances();
    await createCourse.selectInstanceDeliveryType("Classroom");
    await createCourse.clickCreateInstance();
    await createCourse.enterSessionName("June");
    await createCourse.setDate("06/15/2024");
    await createCourse.setTime("Start Time", "09:00 AM");
    await createCourse.setTime("End Time", "01:00 PM");
    await createCourse.selectInstructor("arivazhaganp");
    await createCourse.selectLocation("Qeagle");   

})
