import { log } from "console";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";



const courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
let domain: any
test(`CreateCourseFor Single Instance`, async ({ adminHome, createCourse }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael S` },
        { type: `TestCase`, description: `Create the course as Single instance` },
        { type: `Test Description`, description: `Verify portal1 course is not availble to portal2 users` }

    );

    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.getCourse();
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(description);
    domain = await createCourse.selectPortal();
    console.log(`${domain}`);
    await createCourse.contentLibrary();
    await createCourse.clickHere();
    await createCourse.selectImage();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifyCourseCreationSuccessMessage();
})

const title = FakerData.getCourseName();
test.skip(`Certification enroll and completion with single instance`, async ({ adminHome, learningPath, createCourse }) => {
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
    await learningPath.hasRecertification();
    await learningPath.clickExpiresButton()
    await learningPath.clickSaveAsDraftBtn();
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

/* test(`featch data from database`,async({dataBase})=>{
  
  try {
    const sample= await dataBase.executeQuery("Select * From iris.course_session_details Order by id Desc Limit 10 ;")
  console.log(sample);
  } catch (error) {
    console.log( "Not executed " + error);
    
  }

}) */

test(`Login as a learner`, async ({ learnerHome, catalog }) => {

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
    await catalog.clickViewCertificationDetails();
    await catalog.clickLaunchButton();
    await catalog.saveLearningStatus();
    await catalog.clickViewCertificate();


})