import { credentialConstants } from "../../constants/credentialConstants";
import { test } from "../../customFixtures/expertusFixture";
import { FakerData, getRandomSeat } from "../../utils/fakerUtils";


const courseName = FakerData.getCourseName();
const elCourseName=FakerData.getCourseName()+"E-learning";
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
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
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
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();
    await createCourse.clickEditCourseTabs();
    await createCourse.addInstances();

    async function addinstance(deliveryType: string) {
        await createCourse.selectInstanceDeliveryType(deliveryType);
        await createCourse.clickCreateInstance();
    }
    await addinstance("Virtual Class");
    await createCourse.enterSessionName(sessionName);
    await createCourse.setMaxSeat();
    await createCourse.enterpastDateValue();
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
    await createCourse.enter("course-title",elCourseName)   
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
   // await catalog.clickFilter();
    // await catalog.enterSearchFilter(tag)
    // await catalog.selectresultantTags(tag);
  //  await catalog.clickApply()
  await catalog.clickMoreonCourse(courseName);
  await catalog.clickSelectcourse(elCourseName);
  await catalog.clickEnroll();
  await catalog.clickMyLearning();
  await catalog.searchMyLearning(elCourseName)    
  await catalog.clicktoPlay();
  await catalog.clickLaunchButton();
  await catalog.clicksaveLearningStatus();
  //url redirect
})



