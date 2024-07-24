import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { credentialConstants } from "../../../constants/credentialConstants";
import { CoursePage } from "../../../pages/CoursePage";


let courseName1 = FakerData.getCourseName();
const description = FakerData.getDescription();
let courseName2 = FakerData.getCourseName();
const sessionName = FakerData.getSession();
const instructorName = credentialConstants.INSTRUCTORNAME
test.describe(`TC074_Verify_the_Enforce_Sequence_flow`, async () => {
    test(`TC060_TP_Prerequisite_Course1_Elearning`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `TP Prerequisite Course1 Elearning` },
            { type: `Test Description`, description: `Verify that course should be created successfully` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName1);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course by name :" + description);
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();

    })


    //test.use({ storageState: "logins/expertusAdminLog.json" })
    test(`TC061_TP_Prerequisite_Course2_MultiClass_ILT_and_Elearning.spec.ts`, async ({ adminHome, createCourse, editCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `TP Prerequisite Course2- MultiClass-ILT and Elearning` },
            { type: `Test Description`, description: `Verify that course should be created in  MultiClass-ILT and Elearning` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.clickMenu("Course");
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName2);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription(description);
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
        await createCourse.verifySuccessMessage();
        await createCourse.clickEditCourseTabs();
        await createCourse.addInstances();

        async function addinstance(deliveryType: string) {
            await createCourse.selectInstanceDeliveryType(deliveryType);
            await createCourse.clickCreateInstance();
        }
        await addinstance("Classroom");
        await createCourse.enterSessionName(sessionName);
        await createCourse.setMaxSeat();
        await createCourse.enterDateValue();
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
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();

    })

    let title = FakerData.getCourseName();
    test(`TC074_Verify_the_Enforce_Sequence_flow`, async ({ adminHome, learningPath, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `TC074_Verify_the_Enforce_Sequence_flow` },
            { type: `Test Description`, description: `Verifing the enforce sequence flow ` }
        );

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCertification();
        await learningPath.clickCreateCertification();
        await learningPath.title(title);
        await learningPath.language();
        await learningPath.description(description);
        await learningPath.selectSpecificPortal('learnerPortal')
        /* await learningPath.clickAndSelectCompliance();
        await learningPath.registractionEnds();
        await learningPath.clickExpiresButton();
        await learningPath.clickAndSelectCompleteByRule(); */
        await learningPath.clickSaveAsDraftBtn();
        await learningPath.clickSave();
        await learningPath.clickProceedBtn();
        async function addingCourse(courseName: any) {
            await learningPath.clickAddCourse();
            await learningPath.searchAndClickCourseCheckBox(courseName);
            await learningPath.clickAddSelectCourse();
        }
        await addingCourse(courseName1);
        await addingCourse(courseName2);
        await learningPath.clickEnforceCheckbox();
        await learningPath.clickDetailTab();
        await learningPath.clickCatalogBtn();
        await learningPath.clickUpdateBtn();
        await learningPath.verifySuccessMessage();
        await learningPath.clickEditCertification();
        await createCourse.clickCompletionCertificate();
        await createCourse.clickCertificateCheckBox();
        await createCourse.clickAdd();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();

    })

    test(`Login as a learner`, async ({ learnerHome, catalog }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Login as a learner` },
            { type: `Test Description`, description: `Verify from learner side` }

        );
        await learnerHome.learnerLogin("LEARNERUSERNAME","LeanrerPortal");
        await learnerHome.clickCatalog();
        await catalog.mostRecent();
        await catalog.searchCatalog(title);
        await catalog.clickEnrollButton();
        await catalog.clickViewCertificationDetails();
        //await catalog.
        //await catalog.clickLaunchButton();
        //await catalog.saveLearningStatus();

    })

})