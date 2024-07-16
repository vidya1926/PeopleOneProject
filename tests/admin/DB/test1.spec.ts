import DB from "../../../utils/dbUtil";
import { test } from "../../../customFixtures/expertusFixture"
import { format, addMinutes } from 'date-fns';


test('fetch data from database', async () => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `fetch data from database` },
        { type: `Test Description`, description: `Database` }
    );
    const dataBase = new DB();
    try {
        const currentTimeResult = await dataBase.executeQuery("SELECT NOW()");
        const currentTimeString = currentTimeResult[0]['NOW()'];
        const currentTime = new Date(currentTimeString);
        const formattedCurrentTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');
        console.log('Formatted Current Time:', formattedCurrentTime);
        const newTime = addMinutes(currentTime, 15);
        const formattedNewTime = format(newTime, 'yyyy-MM-dd HH:mm:ss');
        console.log('Formatted New Time (after 15 minutes):', formattedNewTime);

        const programEnrollment = await dataBase.executeQuery(`SELECT * FROM iris.program_enrollment ORDER BY id DESC LIMIT 1;`)
        console.log(programEnrollment);
        const idString = String(programEnrollment[0].id);
        console.log("Retrived Id = " + idString);

        const updateProgramEnrollment = await dataBase.executeQuery(`update cron_details set next_run='${formattedNewTime}',current_status='processing'  where id=${idString}  ;`)
        console.log(updateProgramEnrollment);

    } catch (error) {
        console.log("Not executed " + error);
    }
});
