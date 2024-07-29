import { credentialConstants } from "../../constants/credentialConstants";
import { test } from "../../customFixtures/expertusFixture";
import { FakerData } from "../../utils/fakerUtils";


const courseName  =FakerData.getCourseName();

const instructorName = credentialConstants.INSTRUCTORNAME
//test.use({ storageState: "logins/expertusAdminLog.json"})
test(`TC090_To_create_Completed_Course`,async({adminHome,createCourse,editCourse})=>{

    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Course creation for instructor` },
        { type:`Test Description`, description: `Verify that Course creation for instructor scheduled tab activities` }
    
        
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title",courseName)
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :"+courseName);
    await createCourse.selectdeliveryType("Virtual Class")
    await createCourse.handleCategoryADropdown();
    await createCourse.providerDropdown()
    await createCourse.selectTotalDuration("48");
    await createCourse.typeAdditionalInfo("Happy Learning!");
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed()
    await createCourse.verifySuccessMessage();
    await createCourse.editcourse();
    await editCourse.clickTagMenu();
    await editCourse.selectTags();
    await editCourse.clickCompletionCertificate();
    await editCourse.selectCourseCompletionCertificate("Testing Application");
    await createCourse.addInstances();
    async function addinstance(deliveryType: string) {
        await createCourse.selectInstanceDeliveryType(deliveryType);
        await createCourse.clickCreateInstance();
    }
    await addinstance("Classroom");
    await createCourse.enterSessionName(courseName);
    await createCourse.enterpastDateValue()
    await createCourse.startandEndTime();
    await createCourse.selectInstructor("arivazhaganp")
    await createCourse.selectLocation();
   await createCourse.setMaxSeat();
   await createCourse.typeDescription("Check for instance Classes for the given course");
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();



    
















})