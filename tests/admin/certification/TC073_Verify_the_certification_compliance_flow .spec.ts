import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const courseName = FakerData.getCourseName();
const description= FakerData.getDescription();
test(`TC064 TP Prerequisite Course5- Elearning`, async ({ adminHome, createCourse,editCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `TP Prerequisite Course5- Elearning` },
        { type: `Test Description`, description: `Verify that course should be created as Elearning` }
    );

    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(description);
    await createCourse.uploadVideoThroughLink();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();

})


const title = FakerData.getCourseName();
test(`Verify certification priced flow`, async ({ learningPath, adminHome, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael S` },
        { type: `TestCase`, description: `Verify certification priced flow` },
        { type: `Test Description`, description: `Verifing Approval on admin side` }
    );

    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCertification();
    await learningPath.clickCreateCertification();
    await learningPath.title(title);
    await learningPath.language();
    await learningPath.description(description);
    await learningPath.clickAndSelectCompliance();
    await learningPath.registractionEnds();
    await learningPath.clickExpiresButton();
    await learningPath.clickAndSelectCompleteByRule();
    await learningPath.clickSaveAsDraftBtn();
    await learningPath.clickSave();
    await learningPath.clickProceedBtn();
    await learningPath.clickAddCourse();
    await learningPath.searchAndClickCourseCheckBox(courseName);
    await learningPath.clickAddSelectCourse();
    await learningPath.clickDetailTab();
    await learningPath.clickCatalogBtn();
    await learningPath.clickUpdateBtn();
    await learningPath.verifySuccessMessage();
    await learningPath.clickEditCertification();
    await createCourse.clickAccessButton()
    
    await createCourse.clickCompletionCertificate();
    await createCourse.clickCertificateCheckBox();
    await createCourse.clickAdd();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();
})