import { credentialConstants } from "../../../constants/credentialConstants";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';


const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const instructorName = credentialConstants.INSTRUCTORNAME
const price=FakerData.getPrice();
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
    await createCourse.selectdeliveryType("Virtual Class");
    await createCourse.enterPrice(price)
    await createCourse.selectCurrency();
    await createCourse.handleCategoryADropdown();
    await createCourse.providerDropdown()
    await createCourse.selectTotalDuration("48");
    await createCourse.typeAdditionalInfo("Happy Learning!");
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.verifyCourseCreationSuccessMessage();
    await createCourse.clickEditCourseTabs();
    await createCourse.addInstances();
    
    async function addinstance(deliveryType: string) {
        await createCourse.selectInstanceDeliveryType(deliveryType);
        await createCourse.clickCreateInstance();
    }
    await addinstance("Classroom");
    await createCourse.enterSessionName(sessionName);
    await createCourse.setMaxSeat("20");
    await editCourse.selectTimeZone("Kolkata");
    await createCourse.setCurrentDate();
    await createCourse.startandEndTime();
    await createCourse.selectInstructor(instructorName);
   //Need to add host
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifyCourseCreationSuccessMessage();

})


