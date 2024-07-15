import {test} from"../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";

test(`TC045_Verify_able_to_create_assessment_questions`,async({ adminHome,SurveyAssessment})=>{
    test.info().annotations.push(
        { type: 'Author', description: 'Vidya' },
        { type: 'TestCase', description: 'Verify_able_to_create_survey_questions' },
        { type:'Test Description', description:"Creating a question for survey"}
    );
    await adminHome.loadAndLogin("LEARNERADMIN")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.assessmentMenu();
    await adminHome.clickOnAssessmentQuestionLink();
    await SurveyAssessment.clickCreateQuestions();
    await SurveyAssessment.enterQuestions();
    await SurveyAssessment.displayOption();
    await SurveyAssessment.selectLanguage();
    await SurveyAssessment.selectingType();
    await SurveyAssessment.clickSave();


})