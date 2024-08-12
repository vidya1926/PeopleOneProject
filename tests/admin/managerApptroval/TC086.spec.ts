import { create } from "domain";
import { credentialConstants } from "../../../constants/credentialConstants";
import { test } from "../../../customFixtures/expertusFixture"
import { CostcenterPage } from "../../../pages/CostcenterPage";
import { FakerData } from '../../../utils/fakerUtils';
import { readDataFromCSV } from "../../../utils/csvUtil";
import { ca } from "date-fns/locale";


const courseName = FakerData.getCourseName();
const instructorName = credentialConstants.INSTRUCTORNAME
const price = FakerData.getPrice();

test(`TC086 _Course Creation for ManagerApproval`, async ({ adminHome, createCourse, editCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Create the course for ManagerApproval` },
        { type: `Test Description`, description: `Verify that course should be created for ManagerApproval` }

    );
    //Fake data:
    await adminHome.loadAndLogin("LEARNERADMIN");
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCourseLink();
    await createCourse.clickCreateCourse();
    await createCourse.verifyCreateUserLabel("CREATE COURSE");
    await createCourse.enter("course-title", courseName);
    await createCourse.selectLanguage("English");
    await createCourse.typeDescription("This is a new course by name :" + courseName);
    await createCourse.contentLibrary();
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
    await editCourse.verifyinternalManager("Direct Manager")
    await editCourse.verifyapprovaluserType("External Users")
    await editCourse.verifyinternalManager("Direct Manager")
    await editCourse.saveApproval()
    await createCourse.typeDescription("  Added Manager Approval")
    await createCourse.clickUpdate()
})

test("Request Manager Approval from Learner Site",async({learnerHome,catalog})=>{
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Learner site verification for manager appproval` },
        { type: `Test Description`, description: `verify the manager appproval for E-learning` }
    );    
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
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
    await learnerHome.clickApprove(courseName);
    await createUser.enter("first_name", FakerData.getFirstName());
        await createUser.enter("last_name", FakerData.getLastName());
        await createUser.typeAddress("Address 1", FakerData.getAddress());
        await createUser.select("Country", country);
        await createUser.select("State/Province", state)
        await createUser.enter("user-city", city);
        await createUser.enter("user-zipcode", zipcode);
        await learnerHome.proceedAndVerify();
        await editCourse.clickClose()
}
});
    
test("Learner Site verification",async({learnerHome,catalog})=>{
    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Learner site verification for manager appproval` },
        { type: `Test Description`, description: `verify the manager appproval for E-learning` }
    );    
    await learnerHome.learnerLogin("LEARNERUSERNAME", "DefaultPortal");
    await learnerHome.clickMyLearning();
    await catalog.searchMyLearning(courseName);
    await catalog.verifyCompletedCourse(courseName);


});