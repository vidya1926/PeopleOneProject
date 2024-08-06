import { credentialConstants } from "../../constants/credentialConstants";
import { test } from "../../customFixtures/expertusFixture";
import { FakerData, getRandomSeat } from "../../utils/fakerUtils";


const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
const maxSeat = getRandomSeat()
const instructorName = credentialConstants.INSTRUCTORNAME
let tag:any
//test.use({ storageState: "logins/expertusAdminLog.json" })
test(`TC103_Multiple Course Creation for Classroom`, async ({ createCourse, adminHome, editCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Verify Multiple Course Creation for Classroom ` },
        { type: `Test Description`, description: `Multiple Course Creation for Classroom` }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.clickMenu("Course");
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription(description);
    await createCourse.selectdeliveryType("Classroom")
    await createCourse.handleCategoryADropdown();
    await createCourse.providerDropdown()
    await createCourse.selectTotalDuration();
    await createCourse.typeAdditionalInfo();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.clickEditCourseTabs()  
    await editCourse.clickTagMenu();
   tag= await editCourse.selectTags();
    await editCourse.clickClose();
    /* Need to Update the script due to Automation Site issuse (20-6-2024) 15:26 */
    // await editCourse.clickCompletionCertificate();
    //await editCourse.selectCourseCompletionCertificate("Playwright Automation");
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();
    await createCourse.clickEditCourseTabs();
    await createCourse.addInstances();

    async function addinstance(deliveryType: string) {
        await createCourse.selectInstanceDeliveryType(deliveryType);
        await createCourse.clickCreateInstance();
    }
    await addinstance("Classroom");
    await createCourse.enterSessionName(sessionName);
    await createCourse.setMaxSeat();
    await createCourse.enterDateValue();
    await createCourse.startandEndTime();
    await createCourse.selectInstructor(instructorName);
    await createCourse.selectLocation();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();
    await createCourse.editcourse();
    await createCourse.clickinstanceClass();
    await createCourse.addInstances();
    await addinstance("E-Learning");
    await createCourse.contentLibrary();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();

})

test(`Verification from learner site`, async ({ learnerHome,learnerCourse, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `vidya` },
        { type: `TestCase`, description: `Learner Side Re-Enrollment` },
        { type: `Test Description`, description: `Verify that learner can reenroll the course` }
    );
    await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
    await learnerHome.clickCatalog();
    await catalog.mostRecent();
    await catalog.searchCatalog(courseName);    
    await catalog.clickMoreonCourse(courseName);
    await catalog.clickSelectcourse(courseName);
    await catalog.clickEnroll();
})



