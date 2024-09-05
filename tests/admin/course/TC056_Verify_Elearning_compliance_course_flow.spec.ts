import path from "path";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils"
import { credentialConstants } from "../../../constants/credentialConstants";
import { updateCronDataJSON } from "../../../utils/jsonDataHandler";
import { updateSingleInstanceAutoRegister } from "../DB/DBJobs";
import { URLConstants } from "../../../constants/urlConstants";


let courseName = ("Cron " + FakerData.getCourseName());
const user = credentialConstants.LEARNERUSERNAME
test(`Course Creation for  E-Learning work flow`, async ({ adminHome, createCourse, editCourse }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Course Creation for  E-Learning work flow' },
        { type: 'Test Description', description: "Verifying E-Learning workflow" }
    );

    const newData = {
        tc056: courseName
    }
    updateCronDataJSON(newData)
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :" + courseName);
    await createCourse.selectDomainOption(URLConstants.portal1);
    await createCourse.providerDropdown();
    await createCourse.clickregistrationEnds();
    await createCourse.selectCompliance();
    await createCourse.selectValidity();
    await createCourse.daysOfValidity("1");
    await createCourse.selectCompleteBy();
    await createCourse.selectCompleteByDate();
    await createCourse.contentLibrary();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.modifyTheAccess();
    await createCourse.clickAccessButton();
    await createCourse.addSingleLearnerGroup(user);
    await createCourse.saveAccessButton();
    await editCourse.clickClose();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();

})

test(`Test to execute CRON JOB`, async ({ }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Test to execute CRON JOB` },
        { type: `Test Description`, description: `Verify the CRON Job` }
    );


    await updateSingleInstanceAutoRegister();
})