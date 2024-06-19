import {test} from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';


const courseName  =FakerData.getCourseName();
//test.use({ storageState: "logins/expertusAdminLog.json"})
test.skip(`TC001_CreateCourseFor Single Instance`,async({adminHome,createCourse})=>{

    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the course as Single instance` },
        { type:`Test Description`, description: `Verify that course should be created for Single instance` }
        
    );
   
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title",courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :"+courseName);
    await createCourse.upload();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifyCourseCreationSuccessMessage();
})
    


    test(`TC001_Learner Verification For Single Instance`,async({learnerHome,catalog})=>{

        test.info().annotations.push(
            { type: `Author`, description: `Vidya` },
            { type: `TestCase`, description: `TC001_Learner Side Course Enrollment` },
            { type:`Test Description`, description: `Verify that course should be created for Single instance` }
        ); 
        await learnerHome.isSignOutVisible();
        await learnerHome.clickMenu("Catalog");
        await catalog.mostRecent("Most Recent")
        await catalog.searchCatalog(courseName);  
        await catalog.clickMoreonCourse(courseName)
        await catalog.clickSelectcourse(courseName)
        await catalog.clickEnroll()
        await catalog.clickLaunchButton("Launch Content");
        await learnerHome.clickMenu("My Learning");
        await catalog.clickCompletedButton("Completed");
        await catalog.verifyCompletedCourse(courseName);
        })
    