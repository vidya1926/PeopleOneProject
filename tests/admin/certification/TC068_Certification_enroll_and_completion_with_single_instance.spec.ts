import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const courseName  =FakerData.getCourseName();
const description= FakerData.getDescription();
let domain:any
//test.use({ storageState: "logins/expertuslearnerLog.json"})
test(`TC001_CreateCourseFor Single Instance`,async({adminHome,createCourse})=>{

    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Create the course as Single instance` },
        { type:`Test Description`, description: `Verify portal1 course is not availble to portal2 users` }
        
    );
   
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title",courseName);
    await createCourse.getCourse();
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(description);
    domain =await createCourse.selectPortal();
    console.log(`${domain}`); 
    await createCourse.contentLibrary();
    await createCourse.clickHere();
    await createCourse.selectImage();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifyCourseCreationSuccessMessage();
})
   
test.skip(`Certification enroll and completion with single instance`, async ({ adminHome, learningPath,editCourse}) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Certification enroll and completion with single instance` },
        { type: `Test Description`, description: `Verify Certification enroll and completion with single instance` }
    );

    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCertification();
    await learningPath.clickCreateCertification();







    
})