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
<<<<<<< HEAD
    );
=======
    ); 
>>>>>>> 58a097de5f322057f9ea9595403ab2cc632bf5e7
    await adminHome.loadAndLogin("LEARNERADMIN")
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English")    
    await createCourse.typeDescription("This is a new course by name :" + courseName);
    await createCourse.contentLibrary();
    await createCourse.uploadVideoThroughLink();
  //await createCourse.addmultipleContentfromLib();
    await createCourse.clickenforceSequence();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage()
    await createCourse.editcourse()
    await createCourse.addsurvey_course()
    await createCourse.addAssesment()
    await createCourse.save_editedcoursedetails()
    await createCourse.verifySuccessMessage()
 
})
<<<<<<< HEAD
//
 
=======

>>>>>>> 58a097de5f322057f9ea9595403ab2cc632bf5e7
test(`TC0054_Learner Verification For Video Sequencing`,async({learnerHome,catalog,learnerCourse})=>{
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `TC054_Learner Side Course verification` },
        { type:`Test Description`, description: `Verify that content sequence flow`}
<<<<<<< HEAD
    );
=======
    ); 
>>>>>>> 58a097de5f322057f9ea9595403ab2cc632bf5e7
    await learnerHome.isSignOutVisible();
    await learnerHome.clickCatalog();
    await catalog.searchCatalog(courseName);
    await catalog.clickEnrollButton();
    await catalog.viewCoursedetails();
    await learnerCourse.clickRandomcontent();
<<<<<<< HEAD
    await learnerCourse.verifyWarningMessage();
})
=======
    await learnerCourse.verifyWarningMessage();   
})



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
>>>>>>> 58a097de5f322057f9ea9595403ab2cc632bf5e7
