import { credentialConstants } from "../../../constants/credentialConstants";
import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

const courseName = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const description = FakerData.getDescription();
const instructorName = credentialConstants.INSTRUCTORNAME;

test.describe(`TC072_Verify_certification_priced_flow`, async () => {
    test(`TC063_TP_Prerequisite_Course4_VC`, async ({ createCourse, adminHome, editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael S` },
            { type: `TestCase`, description: `TP Prerequisite Course4 VC` },
            { type: `Test Description`, description: `Creating the prerequisite for TC072` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.clickMenu("Course");
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription(description);
        await createCourse.selectdeliveryType("Virtual Class")
        await createCourse.handleCategoryADropdown();
        await createCourse.providerDropdown()
        await createCourse.selectTotalDuration("48");
        await createCourse.typeAdditionalInfo(description);
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.modifyTheAccess();
        await editCourse.clickClose();
        await editCourse.clickTagMenu();
        await editCourse.selectTags();
        await editCourse.clickClose();
        await createCourse.clickCompletionCertificate();
        await createCourse.clickCertificateCheckBox();
        await createCourse.clickAdd();
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
        const country = "kolkata"
        await addinstance("Virtual Class");
        await createCourse.enterSessionName(sessionName);
        await createCourse.sessionType();
        await createCourse.setMaxSeat();
        await createCourse.entertimezone(country);
        await createCourse.enterStartDate();
        await createCourse.startandEndTime();
        await createCourse.attendeeUrl();
        await createCourse.presenterUrl();
        await createCourse.selectInstructor(instructorName);
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();

    })

    const title = FakerData.getCourseName();
    test(`Verify certification priced flow`, async ({ learningPath, adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael S` },
            { type: `TestCase`, description: `Verify certification priced flow` },
            { type: `Test Description`, description: `Verifing Approval on admin side` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
        await learningPath.clickCreateCertification();
        await learningPath.title(title);
        await learningPath.language();
        await learningPath.description(description);
        await learningPath.enterPrice();
        await learningPath.clickCurrency();
        await learningPath.clickSaveAsDraftBtn();
        await learningPath.clickSave();
        await learningPath.clickProceedBtn();
        await learningPath.clickAddCourse();
        await learningPath.searchAndClickCourseCheckBox(courseName);
        await learningPath.clickAddSelectCourse();
        await learningPath.clickDetailTab();
        await learningPath.clickCatalogBtn();
        await learningPath.clickUpdateBtn();
        await learningPath.verifySuccessMessage();
        await learningPath.clickEditCertification();
        await createCourse.clickCompletionCertificate();
        await createCourse.clickCertificateCheckBox();
        await createCourse.clickAdd();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
    })

    test(`Login as a learner`, async ({ learnerHome, catalog, costCenter,dashboard }) => {

        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Login as a learner` },
            { type: `Test Description`, description: `Verify from learner side` }

        );
        await learnerHome.learnerLogin("LEARNERUSERNAME","LeanrerPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(title);
        await catalog.clickMoreonCourse(title)
        await catalog.addToCart();
        await catalog.verifyAddedToCart();
        await catalog.clickShoppingCartIcon();
        await catalog.clickProceedToCheckout();
        await costCenter.orderSummaryLabelVerify();
        await costCenter.billingDetails("United States", "Alaska");
        await costCenter.paymentMethod("Cost center");
        await costCenter.fillCostCenterInput();
        await costCenter.clickTermsandCondition();
        await costCenter.clickCheckout("Home");
        await costCenter.verifySuccessMsg();
        await learnerHome.clickMyLearning();
        await learnerHome.clickDashboardLink();
        await dashboard.clickLearningPath_And_Certification();
        await dashboard.clickCertificationLink();
        await dashboard.pendingTab(title);

    })
    test(`Commerce side Verification`, async ({ adminHome, costCenter, createCourse, commercehome }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `TC059_Commerce side order verification ` },
            { type: `Test Description`, description: `Verify that course should be created for VC` }
        );
        await adminHome.loadAndLogin("COMMERCEADMIN")
        await adminHome.menuButton();
        await adminHome.clickCommerceMenu();
        await commercehome.clickOrder();
        await commercehome.approveOrder();
        await commercehome.verifySuccessMessage();
    })

})