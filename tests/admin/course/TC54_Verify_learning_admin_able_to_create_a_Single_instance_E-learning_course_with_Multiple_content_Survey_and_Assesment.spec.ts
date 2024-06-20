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
 
    await adminHome.clickMenu("Course");
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English")    
    await createCourse.typeDescription("This is a new course by name :" + courseName);    
    await createCourse.uploadPDF()
    await createCourse.uploadvideo()
    await createCourse.clickCatalog()
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifyCourseCreationSuccessMessage()
    await createCourse.editcourse()
    await createCourse.addsurvey_course()
    await createCourse.addAssesment()
    await createCourse.save_editedcoursedetails()
    await createCourse.verifyCourseCreationSuccessMessage()

})