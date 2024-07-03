import {test} from "../../customFixtures/expertusFixture"
import { FakerData } from '../../utils/fakerUtils';

test.use({ storageState: "logins/expertusAdminLog.json"})
test(` creating learners for the application`,async({adminHome,createCourse})=>{

    var courseName = FakerData.getCourseName();

    await adminHome.clickMenu("Course");
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title",courseName);
    await createCourse.typeDescription("This is a new course by name :" + courseName);
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    
})