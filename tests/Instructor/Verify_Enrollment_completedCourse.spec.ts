import { credentialConstants } from "../../constants/credentialConstants";
import { credentials } from "../../constants/credentialData";
import { test } from "../../customFixtures/expertusFixture";
import { FakerData } from "../../utils/fakerUtils";



const instructorName = credentialConstants.INSTRUCTORNAME
const courseName = FakerData.getCourseName();


test(`TC090_Instructor based course`, async ({ adminHome, createCourse, editCourse }) => {

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
    await createCourse.selectdeliveryType("Classroom")
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
    await createCourse.enterSessionName(courseName);
    await createCourse.enterpastDateValue();
    await createCourse.startandEndTime();
    await createCourse.selectInstructor(credentials.INSTRUCTORNAME.username)
    await createCourse.typeAdditionalInfo()
    await createCourse.selectLocation();
    await createCourse.setMaxSeat();
    await createCourse.typeDescription("Check the instance class for the availed course")
    // await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();
})

//testcase is not clear for the flow -script completed for instructor and enroll Admin
test(`TC092_Enrollment for Completed class`, async ({ adminHome, enrollHome }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Enrollment for schedule class` },
        { type: `Test Description`, description: `Enrollment for schedule class` }


    );
    await adminHome.loadAndLogin("ENROLLADMIN");
    await adminHome.menuButton()
    await adminHome.clickEnrollmentMenu();
    await adminHome.clickEnroll();
    await enrollHome.selectEnroll();
    await enrollHome.selctBycourse(courseName)
    await enrollHome.clickSelectedLearner();
    await enrollHome.enterSearchUser("User")
    await enrollHome.clickEnrollBtn();
    await enrollHome.verifytoastMessage()
})




test(`TC094_Instructor role for Completed class`, async ({ adminHome, enrollHome, instructorHome }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Enrollment for schedule class` },
        { type: `Test Description`, description: `Enrollment for schedule class` }


    );
    await adminHome.loadAndLogin("INSTRUCTORNAME");
    await adminHome.menuButton();
    await adminHome.clickInstructorLink();
    await instructorHome.clickFilter();
    await instructorHome.selectDeliveryType()
    await instructorHome.selectStatus("Completed");
    await instructorHome.clickApply("Completed");
    await instructorHome.entersearchField(courseName)
    await instructorHome.clickEnrollmentIcon(courseName);
    await enrollHome.selectEnrollOrCancel("Completed")
    await enrollHome.enterReasonAndSubmit();
    await enrollHome.verifytoastMessage()

})


