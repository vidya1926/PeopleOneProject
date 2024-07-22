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
        //Query to Retrive the
        const currentTimeResult = await dataBase.executeQuery("SELECT NOW()");
        const currentTimeString = currentTimeResult[0]['NOW()'];

        const currentTime = new Date(currentTimeString);
        const pastDate = currentTime.setDate(currentTime.getDate() - 2);
        const formattedPreviousDate = format(pastDate, 'yyyy-MM-dd HH:mm:ss');

        //Query to retrive the data
        const programEnrollment = await dataBase.executeQuery(`SELECT * FROM iris.program_enrollment ORDER BY id DESC LIMIT 1;`)
        console.log(programEnrollment);

        const idString = String(programEnrollment[0].id);
        console.log("Retrived Id = " + idString);

        //Query to UPDATE the ProgramEnrollment 
        const updateProgramEnrollment = await dataBase.executeQuery(`update iris.program_enrollment set completion_date='${formattedPreviousDate}' where id='${idString}';`)
        console.log(updateProgramEnrollment);


        const formattedCurrentTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');
        console.log('Formatted Current Time:', formattedCurrentTime);
        currentTime.setDate(currentTime.getDate() + 2)
        const newTime = new Date(currentTime.getTime() - 15 * 60 * 1000);
        const formattedNewTime = format(newTime, 'yyyy-MM-dd HH:mm:ss');
        console.log('Formatted New Time (15 mins subtracted):', formattedNewTime);
        
        //Query to run the CRON job
        const cronJob = await dataBase.executeQuery(`update cron_details set next_run='${formattedNewTime}',current_status='processing'  where id=${idString} ;`)
        console.log(cronJob);


    } catch (error) {
        console.log("Not executed " + error);
    }
});


