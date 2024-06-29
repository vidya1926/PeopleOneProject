import { credentialConstants } from "../../../constants/credentialConstants";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';


const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const description= FakerData.getDescription();
const instructorName = credentialConstants.INSTRUCTORNAME
//test.use({ storageState: "logins/expertusAdminLog.json" })
test(`Multiple Course Creation for Classroom`, async ({ adminHome, createCourse, editCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Create the course as multiple instance` },
        { type: `Test Description`, description: `Verify that course should be created as multiple instance when ILT or VC delivery type is chosen` }

    );
    //Fake data:
    const login = "customerAdmin"
    await adminHome.clickMenu("Course");
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(description);
    await createCourse.selectdeliveryType("Classroom")
    await createCourse.handleCategoryADropdown();
    await createCourse.providerDropdown()
    await createCourse.selectTotalDuration("48");
    await createCourse.typeAdditionalInfo("Happy Learning!");
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.modifyTheAccess();
    await editCourse.clickClose();
    await editCourse.clickTagMenu();
    await editCourse.selectTags();
    await editCourse.clickClose();
    /* Need to Update the script due to Automation Site issuse (20-6-2024) 15:26 */
    // await editCourse.clickCompletionCertificate();
    //await editCourse.selectCourseCompletionCertificate("Playwright Automation");
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifyCourseCreationSuccessMessage();
    await createCourse.clickEditCourseTabs();
    await createCourse.addInstances();
    
    async function addinstance(deliveryType: string) {
        await createCourse.selectInstanceDeliveryType(deliveryType);
        await createCourse.clickCreateInstance();
    }
    await addinstance("Classroom");
    await createCourse.enterSessionName(sessionName);
    await createCourse.setMaxSeat();
    await createCourse.setCurrentDate();
    await createCourse.startandEndTime();
    await createCourse.selectInstructor(instructorName);
    await createCourse.selectLocation();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifyCourseCreationSuccessMessage();
    await createCourse.editcourse();
    await createCourse.clickinstanceClass();
    await createCourse.addInstances();
    await addinstance("E-Learning");
    await createCourse.contentLibrary();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifyCourseCreationSuccessMessage();

})


const title = FakerData.getCourseName();
test(`Certification enroll and completion with single instance`, async ({ adminHome, learningPath, createCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Certification enroll and completion with single instance` },
        { type: `Test Description`, description: `Verify Certification enroll and completion with single instance` }
    );

    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCertification();
    await learningPath.clickCreateCertification();
    await learningPath.title(title);
    await learningPath.description(description);
    await learningPath.language();
    await learningPath.clickSave();
    await learningPath.clickProceedBtn();
    await learningPath.clickAddCourse();
    await learningPath.searchAndClickCourseCheckBox(courseName);
    await learningPath.clickAddSelectCourse();
    await learningPath.clickDetailTab();
    await learningPath.clickCatalogBtn();
    await learningPath.clickUpdateBtn();
    await learningPath.verifyLearningPath();
    await learningPath.clickEditCertification();
    await createCourse.clickCompletionCertificate();
    await createCourse.clickCertificateCheckBox();
    await createCourse.clickAdd();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifyCourseCreationSuccessMessage();


})

test(`Login as a learner`, async ({ learnerHome, catalog,dashboard }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Login as a learner` },
        { type: `Test Description`, description: `Verify from learner side` }

    );

    await learnerHome.isSignOutVisible();
    await learnerHome.clickCatalog();
    await catalog.mostRecent();
    await catalog.searchCatalog(title);
    await catalog.clickEnrollButton();
    await catalog.clickOkButton();
    await learnerHome.clickDashboardLink();
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    await dashboard.searchCertification(title);
    await dashboard.verifyTheEnrolledCertification(title);

    


})