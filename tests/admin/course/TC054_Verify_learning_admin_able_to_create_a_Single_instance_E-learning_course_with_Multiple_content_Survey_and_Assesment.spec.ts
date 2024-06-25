import path from "path";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils"


//test.use({ storageState: "logins/expertusAdminLog.json" })
var courseName = FakerData.getCourseName();
test(`Course Creation for Single_Instance E-Learning with multiple contents`, async ({ adminHome, createCourse }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Course Creation for Single_Instance E-Learning with multiple contents'},
        { type:'Test Description', description:"Verify learning admin able to create a Single instance E-learning course with Multiple content ,Survey and Assesment"}
    ); 
 
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English")    
    await createCourse.typeDescription("This is a new course by name :" + courseName);   
    //video content uplod is not working 
//    await createCourse.multipleContent();
     await createCourse.contentLibrary();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifyCourseCreationSuccessMessage()
    await createCourse.editcourse()
    await createCourse.addsurvey_course()
    await createCourse.addAssesment()
    await createCourse.save_editedcoursedetails()
    await createCourse.verifyCourseCreationSuccessMessage()

})
//

// test(`TC0054_Learner Verification For Video Sequencing`,async({learnerHome,catalog,learnercourse})=>{

//     test.info().annotations.push(
//         { type: `Author`, description: `Vidya` },
//         { type: `TestCase`, description: `TC001_Learner Side Course verification` },
//         { type:`Test Description`, description: `Verify that course should be created for Single instance` }
//     ); 
//     await learnerHome.isSignOutVisible();
//     await learnerHome.clickCatalog();
//     await catalog.searchCatalog(courseName);
//     await catalog.clickEnrollButton(courseName,"Enrolled");
//     await catalog.viewCoursedetails();
//     //video sequence issue yet to fix from Product side
//     await learnercourse.clicksecondContent()
//     await learnercourse.verifyWarningmessage();
//     await learnercourse.clickfirstContent();
//     await learnercourse.clicksecondContent()
//     await catalog.saveLearningStatus()
//    //need to attach the survey and assesment 






// })



// test(`TC0054_1_Learner Verification For Servey and Assessment`,async({learnerHome,catalog,learnercourse})=>{

//     test.info().annotations.push(
//         { type: `Author`, description: `Vidya` },
//         { type: `TestCase`, description: `TC001_Learner Side Course verification` },
//         { type:`Test Description`, description: `Verify that course should be created for Single instance` }
//     ); 
//     await learnerHome.isSignOutVisible();
//     await learnerHome.clickCatalog();
//     await catalog.searchCatalog("");
//     await catalog.clickEnrollButton(courseName,"Enrolled");
//     await catalog.viewCoursedetails();
//     await learnercourse.clickfirstContent();
//     await learnercourse.clicksecondContent()
//     await catalog.saveLearningStatus();
//     //need to add survey and assessment
       
// })