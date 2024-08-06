import { credentialConstants } from "../../constants/credentialConstants";
import { test } from "../../customFixtures/expertusFixture";
import { FakerData } from "../../utils/fakerUtils";



const instructorName = credentialConstants.INSTRUCTORNAME
const courseName = FakerData.getCourseName();


//test.use({ storageState: "logins/expertusAdminLog.json"})
test(`TC089_Instructor based course`, async ({ adminHome, createCourse, editCourse }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Course creation for instructor` },
        { type: `Test Description`, description: `Verify that Course creation for instructor scheduled tab activities` }


    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName)
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :" + courseName);
    await createCourse.selectdeliveryType("Virtual Class")
    await createCourse.handleCategoryADropdown();
    await createCourse.providerDropdown()
    await createCourse.selectTotalDuration();
    await createCourse.typeAdditionalInfo();
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed()
    await createCourse.verifySuccessMessage();
    await createCourse.editcourse();
    await editCourse.clickTagMenu();
    await editCourse.selectTags();
    await createCourse.clickCompletionCertificate();
    await createCourse.clickCertificateCheckBox();
    await createCourse.clickAdd();
    await createCourse.addInstances();
    async function addinstance(deliveryType: string) {
        await createCourse.selectInstanceDeliveryType(deliveryType);
        await createCourse.clickCreateInstance();
    }
    await addinstance("Classroom");
    await createCourse.setMaxSeat();
    await createCourse.enterSessionName(courseName);
    await createCourse.enterfutureDateValue();
    await createCourse.startandEndTime();
    await createCourse.selectInstructor("arivazhaganp")
    await createCourse.typeAdditionalInfo()
    await createCourse.selectLocation();
    await createCourse.setMaxSeat();
    await createCourse.typeDescription("Check for instance class for the availed course")
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();
})