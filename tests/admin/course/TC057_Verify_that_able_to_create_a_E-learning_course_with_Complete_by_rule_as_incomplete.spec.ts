import {test} from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';


const courseName  =FakerData.getCourseName();
//test.use({ storageState: "logins/expertusAdminLog.json"})
test(`TC057_E-learning course with Complete by rule`,async({adminHome,createCourse})=>{

    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `E-learning course with Complete by rule` },
        { type:`Test Description`, description: `Verify that E-learning course with Complete by rule` }
        
    );
   
    

    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title",courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :"+courseName);
    await createCourse.clickregistrationEnds();
    await createCourse.selectCompleteByRule();    
    await createCourse.selectCompleteByDate();    
    await createCourse.contentLibrary(); 
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifyCourseCreationSuccessMessage();
    await createCourse.editcourse();
    await createCourse.clickAccesstab();
    await createCourse.addLearnerGroup();
    await createCourse.clickAccessSetting();
    await createCourse.setCourseMandatory();
    

})
    


    // test(`TC052_Learner Verification For Single Instance`,async({learnerHome,catalog})=>{

    //     test.info().annotations.push(
    //         { type: `Author`, description: `Vidya` },
    //         { type: `TestCase`, description: `TC001_Learner Side Course Enrollment` },
    //         { type:`Test Description`, description: `Verify that course should be created for Single instance` }
    //     ); 
    //     await learnerHome.isSignOutVisible();
    //     await learnerHome.clickCatalog();
    //     await catalog.mostRecent();
    //     await catalog.searchCatalog(courseName);  
    //     await catalog.clickMoreonCourse(courseName)
    //     await catalog.clickSelectcourse(courseName)
    //     await catalog.clickEnroll()
    //     await catalog.clickLaunchButton();
    //     await catalog.saveLearningStatus();
       
    //     })

