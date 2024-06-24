import {test} from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';

const courseName  =FakerData.getCourseName();

//test.use({ storageState: "logins/expertuslearnerLog.json"})
test(`TC001_CreateCourseFor Single Instance`,async({adminHome,createCourse})=>{

    test.info().annotations.push(
        { type: `Author`, description: `Ranjini` },
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
    await createCourse.typeDescription('Test')
    await createCourse.selectPortal();
    await createCourse.contentLibrary();
    await createCourse.clickHere();
    await createCourse.selectImage();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifyCourseCreationSuccessMessage();
})
    

test(`Verify using learner login`, async({learnerHome,catalog})=>{

    test.info().annotations.push(
        { type: `Author`, description: `Ranjini` },
        { type: `TestCase`, description: `Create the course as Single instance` },
        { type:`Test Description`, description: `Verify portal1 course is not availble to portal2 users` }
        
    );

    await learnerHome.isSignOutVisible();
    await learnerHome.clickCatalog();
    console.log(courseName)
    await catalog.searchCatalog(courseName);
  
 //steps are incomplete to proceed    


})

    