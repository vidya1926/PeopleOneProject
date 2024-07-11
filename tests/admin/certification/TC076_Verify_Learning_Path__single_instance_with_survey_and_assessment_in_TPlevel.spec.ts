import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";
import { credentialConstants } from "../../../constants/credentialConstants";

let courseName = FakerData.getCourseName();
const description = FakerData.getDescription();
const sessionName = FakerData.getSession();
const instructorName = credentialConstants.INSTRUCTORNAME
test.describe(`TC_076Verify_Learning_Path__single_instance_with_survey_and_assessment_in_TPlevel`, async () => {
    test(`TC062_TP Prerequisite Course3- Elearning`, async ({ adminHome, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `TP Prerequisite Course3 Elearning` },
            { type: `Test Description`, description: `Verify that course should be created successfully` }
        );
        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickCourseLink();
        await createCourse.clickCreateCourse();
        await createCourse.verifyCreateUserLabel("CREATE COURSE");
        await createCourse.enter("course-title", courseName);
        await createCourse.selectLanguage("English");
        await createCourse.typeDescription("This is a new course,:" + description);
        await createCourse.contentLibrary();
        await createCourse.clickCatalog();
        await createCourse.clickSave();
        await createCourse.clickProceed();
        await createCourse.verifySuccessMessage();

    })
    let title = FakerData.getCourseName();
    test(`TC076Verify_Learning_Path__single_instance_with_survey_and_assessment_in_TPlevel-Admin_Site`, async ({ adminHome, learningPath, createCourse }) => {
        test.info().annotations.push(
            { type: `Author`, description: `Ajay Michael` },
            { type: `TestCase`, description: `Verify_Learning_Path__single_instance_with_survey_and_assessment_in_TPlevel-Admin_Site` },
            { type: `Test Description`, description: `Creating Learning Path single instance with survey and assessment in TPlevel` }
        )

        await adminHome.loadAndLogin("CUSTOMERADMIN")
        await adminHome.menuButton();
        await adminHome.clickLearningMenu();
        await adminHome.clickLearningPath();
        await learningPath.clickCreateLearningPath();
        await learningPath.title(title);
        await learningPath.description(description);
        await learningPath.language();
        await learningPath.clickSave();
        await learningPath.clickProceedBtn();
        await learningPath.clickAddCourse();
        await learningPath.searchAndClickCourseCheckBox(courseName);
        await learningPath.clickAddSelectCourse();
        await learningPath.clickDetailTab();
        await learningPath.clickCatalogBtn();
        await learningPath.clickUpdateBtn();
        await learningPath.verifySuccessMessage();
        await learningPath.clickEditLearningPath()
        await createCourse.addsurvey_course();
        await createCourse.addAssesment();
        await createCourse.clickDetailButton();
        await createCourse.clickUpdate();
        await createCourse.verifySuccessMessage();
    })

})