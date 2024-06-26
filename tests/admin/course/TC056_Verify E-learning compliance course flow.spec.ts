import path from "path";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils"


var courseName = FakerData.getCourseName();
test(`Course Creation for  E-Learning work flow`, async ({ adminHome, createCourse }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Vidya' },
        { type: 'TestCase', description: 'Course Creation for  E-Learning work flow'},
        { type:'Test Description', description:"Verifying E-Learning workflow"}
    ); 
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");  
    await createCourse.typeDescription("This is a new course by name :" + courseName); 
    await createCourse.selectDomain("E1Internal");
    await createCourse.selectProvider("Transition");
    await createCourse.selectCompliance();
    await createCourse.selectValidity();
    await createCourse.daysOfValidity("1");
    await createCourse.selectCompleteBy();
    await createCourse.selectCompleteByDate();
    await createCourse.contentLibrary();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifyCourseCreationSuccessMessage()    
    //incomplete-->cron job is scheduled here to progress

})

//learnerside testcase is incomplete TC056