import { credentialConstants } from "../../../constants/credentialConstants";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';


const courseName = FakerData.getCourseName();
const instructorName = credentialConstants.INSTRUCTORNAME
const price=FakerData.getPrice();



//test.use({ storageState: "logins/expertusAdminLog.json" })
test(`Course Creation for Classroom`, async ({ adminHome, createCourse, editCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the course as multiple instance` },
        { type: `Test Description`, description: `Verify that course should be created as multiple instance when ILT or VC delivery type is chosen` }

    );
    //Fake data:
    const login = "customerAdmin"
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :" + courseName);
    await createCourse.selectdeliveryType("Virtual Class");
    await createCourse.enterPrice(price)
    await createCourse.selectCurrency();
    await createCourse.handleCategoryADropdown();
    await createCourse.providerDropdown()
    await createCourse.selectTotalDuration("12");
    await createCourse.typeAdditionalInfo("Happy Learning!");
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await createCourse.clickEditCourseTabs();
    await createCourse.addInstances();

    async function addinstance(deliveryType: string) {
        await createCourse.selectInstanceDeliveryType(deliveryType);
        await createCourse.clickCreateInstance();       
    }
    await addinstance("Virtual Class");    
    await createCourse.selectMeetingType(instructorName,courseName,1);
    await createCourse.typeAdditionalInfo(courseName)
    await createCourse.clickaddIcon();
    await createCourse.selectMeetingType(instructorName,courseName,2);
    await createCourse.setMaxSeat();
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    })



test(`Verification from learner site`, async ({ learnerHome, catalog }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `TC001_Learner Side Course Enrollment` },
        { type: `Test Description`, description: `Verify that course should be created for Single instance` }
    );
    await learnerHome.isSignOutVisible();
    await learnerHome.clickCatalog();
    await catalog.mostRecent();
    await catalog.searchCatalog(courseName);
    await catalog.clickMoreonCourse(courseName)
    await catalog.clickSelectcourse(courseName)
    await catalog.clickEnroll()
  //need to add the cost center place order ->application issue
})


// test(`Commerce side Verification`, async ({ adminHome, commercehome }) => {
//     test.info().annotations.push(
//         { type: `Author`, description: `Vidya` },
//         { type: `TestCase`, description: `TC059_Commerce side order verification ` },
//         { type: `Test Description`, description: `Verify that course should be created for VC` }
//     );
//     await adminHome.menuButton();
//     await adminHome.clickCommerceMenu();
//     await  commercehome.clickOrder();
//     //order placement is pending from Learner side to continue with commerce order verfication
 
  
// })




