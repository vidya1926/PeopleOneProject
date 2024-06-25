import { credentialConstants } from "../../../constants/credentialConstants";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';


const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const instructorName = credentialConstants.INSTRUCTORNAME
//test.use({ storageState: "logins/expertusAdminLog.json" })
test(`Course Creation for Classroom`, async ({ adminHome, createCourse, editCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Create the course as multiple instance` },
        { type: `Test Description`, description: `Verify that course should be created as multiple instance when ILT or VC delivery type is chosen` }

    );


    //Fake data:
    const login = "customerAdmin"



    await adminHome.clickMenu("Course");
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :" + courseName);
    await createCourse.selectdeliveryType("Classroom")
    await createCourse.handleCategoryADropdown();
    await createCourse.providerDropdown()
    await createCourse.selectTotalDuration("48");
    await createCourse.typeAdditionalInfo("Happy Learning!");
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.modifyTheAccess();
    await editCourse.clickClose();
    await editCourse.clickTagMenu();
    await editCourse.selectTags();
    await editCourse.clickClose();
    /* Need to Update the script due to Automation Site issuse (20-6-2024) 15:26 */
    // await editCourse.clickCompletionCertificate();
    //await editCourse.selectCourseCompletionCertificate("Playwright Automation");
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifyCourseCreationSuccessMessage();
    await createCourse.clickEditCourseTabs();
    await createCourse.addInstances();

    async function addinstance(deliveryType: string) {
        await createCourse.selectInstanceDeliveryType(deliveryType);
        await createCourse.clickCreateInstance();
        await createCourse.enterSessionName(sessionName);
        await createCourse.setMaxSeat("20");
        await createCourse.setCurrentDate();
        await createCourse.startandEndTime();
        await createCourse.selectInstructor(instructorName);
        await createCourse.selectLocation();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifyCourseCreationSuccessMessage();
    }
    await addinstance("Classroom");
    await createCourse.editcourse();
    await createCourse.clickinstanceClass();
    await createCourse.addInstances();
    addinstance("E-Learning");

})


