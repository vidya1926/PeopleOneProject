import { create } from "domain";
import { credentialConstants } from "../../../constants/credentialConstants";
import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { readDataFromCSV } from "../../../utils/csvUtil";


const courseName = FakerData.getCourseName();
const instructorName = credentialConstants.INSTRUCTORNAME
const price = FakerData.getPrice();
const sessionName = FakerData.getSession();
let certificate:any

test(`TC088_Course Creation for ManagerApproval for ILT`, async ({ adminHome, createCourse, editCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the ILT course for ManagerApproval` },
        { type: `Test Description`, description: `Verify that course should be created for ManagerApproval` }

    );
    //Fake data:
    await adminHome.loadAndLogin("CUSTOMERADMIN"); //Need to user learner admin which is not having location data
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectdeliveryType("Classroom")
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :" + courseName);
    await createCourse.enterPrice(price);
    await createCourse.selectCurrency();  
    await createCourse.clickCatalog();
    await createCourse.clickSave();
    await createCourse.clickProceed();
    await createCourse.verifySuccessMessage();
    await createCourse.clickEditCourseTabs();    
    await editCourse.clickManagerApproval();
    await editCourse.verifyInheritanceMessage();
    await editCourse.verifyapprovaluserType("Internal Users")
    await editCourse.clickinternalManager("Either Direct or Other Manager")
    await editCourse.verifyapprovaluserType("External Users")    
    await editCourse.clickexternalManager("Either Direct or Other Manager")
    await editCourse.saveApproval();
    await createCourse.addInstances();    
    async function addinstance(deliveryType: string) {
        await createCourse.selectInstanceDeliveryType(deliveryType);
        await createCourse.clickCreateInstance();
    }
    await addinstance("Classroom");
    await createCourse.enterSessionName(sessionName);   
    await createCourse.enterDateValue();
    await createCourse.startandEndTime();
    await createCourse.selectInstructor(instructorName);
    await createCourse.selectLocation();
    await createCourse.setMaxSeat();
    await createCourse.typeDescription("Created new Instance")
    await createCourse.clickCatalog();
    await createCourse.clickUpdate();
    await createCourse.verifySuccessMessage();
    await createCourse.clickEditCourseTabs();
    await createCourse.clickCompletionCertificate(); //to be checked
    await createCourse.clickCertificateCheckBox();
    await createCourse.clickAdd();
    await createCourse.typeDescription("Added Completion certificate")
    await createCourse.clickUpdate()
    await createCourse.verifySuccessMessage();
   
})

test("Request Manager Approval from Learner Site",async({learnerHome,catalog})=>{
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Learner site verification for manager appproval` },
        { type: `Test Description`, description: `verify the manager appproval for E-learning` }
    );    
    await learnerHome.learnerLogin("EXTERNALUSER", "Default portal");
    await learnerHome.clickCatalog();
    await catalog.mostRecent();
    await catalog.searchCatalog(courseName);
    await catalog.clickMoreonCourse(courseName);
    await catalog.clickSelectcourse(courseName);
    await catalog.clickRequestapproval();
    await catalog.requstcostCenterdetails();
})


test("Approve Request",async({learnerHome,createUser,editCourse})=>{
    const csvFilePath = './data/User.csv';
const data = await readDataFromCSV(csvFilePath);

for (const row of data) {
     const { country, state, timezone, currency, city, zipcode } = row;
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Learner site verification for manager appproval` },
        { type: `Test Description`, description: `verify the manager appproval for E-learning` }
    );    
    await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
    await learnerHome.selectCollaborationHub();
    await learnerHome.searchApprovalCourse(courseName)
    await learnerHome.clickApprove(courseName);
    await createUser.enter("firstName", FakerData.getFirstName());
        await createUser.enter("lastName", FakerData.getLastName());
        await createUser.typeAddress("Address 1", FakerData.getAddress());
        await createUser.select("Country", country);
        await createUser.select("State/Province", state)
        await createUser.enter("city", city);
        await createUser.enter("zip", zipcode);
        await learnerHome.proceedAndVerify();
        await editCourse.clickClose();
    }
});
    
//doubts in ceritfication verification

test("Learner Site verification",async({learnerHome,catalog,dashboard})=>{
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Learner site verification for manager appproval` },
        { type: `Test Description`, description: `verify the manager appproval for E-learning` }
    );    
    await learnerHome.learnerLogin("EXTERNALUSER", "DefaultPortal");
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(courseName);
    await catalog.verifyCompletedCourse(courseName);
    await dashboard.clickLearningPath_And_Certification();
    await dashboard.clickCertificationLink();
    // await dashboard.searchCertification(courseName);//cerifictename
    // await dashboard.verifyTOCompleteCert(courseName)    
});
