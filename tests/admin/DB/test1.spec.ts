import DB from "../../../utils/dbUtil";
import { test } from "../../../customFixtures/expertusFixture"
import { format, addMinutes, addDays } from 'date-fns';


test('fetch data from database', async () => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `fetch data from database` },
        { type: `Test Description`, description: `Database` }
    );
    const dataBase = new DB();
    try {
        let AutoRegister = await dataBase.executeQuery(` SELECT * FROM iris.cron_master WHERE name = 'Autoregister'`);
        let retriveAutoRegisterID = String(AutoRegister[0].id);
        console.log("Retrived registerId is : " + retriveAutoRegisterID);
        await dataBase.executeQuery(`UPDATE iris.cron_master SET status='1' WHERE id ='${retriveAutoRegisterID}'`);

        let learningPlanAndCertification = await dataBase.executeQuery(`SELECT * FROM iris.cron_details WHERE name = 'LearningPlan and Certification AutoRegister' AND portal_id = 1;`);
        let retriveLearningPlanId = String(learningPlanAndCertification[0].id);
        console.log("Retrived learningPlanId is : " + retriveLearningPlanId);
        let updatedResult = await dataBase.executeQuery(`UPDATE iris.cron_details SET current_status = 'waiting', previous_status= '', status= '1' WHERE id = '${retriveLearningPlanId}' ;`);
        console.log(updatedResult);


    } catch (error) {
        console.log("Not executed " + error);
    }
});


