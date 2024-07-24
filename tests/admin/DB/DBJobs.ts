
import DB from "../../../utils/dbUtil";
import { format, addMinutes, addDays, subDays } from 'date-fns';

const dataBase = new DB();
async function updateCronForEnrollment() {
    try {
        //Query to Retrive the Current Time
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
        const updateProgramEnrollment = await dataBase.executeQuery(`UPDATE iris.program_enrollment SET completion_date='${formattedPreviousDate}' WHERE id='${idString}';`)
        console.log(updateProgramEnrollment);
        const verification = await dataBase.executeQuery(`SELECT * FROM iris.program_enrollment WHERE id=61 ;`)
        const completionDate = verification[0].completion_date
        console.log("The Updated Completion date = " + completionDate);


        const formattedCurrentTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');
        console.log('Formatted Current Time:', formattedCurrentTime);
        currentTime.setDate(currentTime.getDate() + 2)
        const newTime = new Date(currentTime.getTime() - 15 * 60 * 1000);
        const formattedNewTime = format(newTime, 'yyyy-MM-dd HH:mm:ss');
        console.log('Formatted New Time (15 mins subtracted):', formattedNewTime);


        const cronJob = await dataBase.executeQuery(`UPDATE cron_details SET next_run='${formattedNewTime}',current_status='waiting',previous_status='processing'  WHERE cron_id=18 ;`)
        console.log(cronJob);



    } catch (error) {
        console.log("Not executed " + error);
    }

}
async function updatecronForBanner() {
    try {
        const currentTimeResult = await dataBase.executeQuery("SELECT NOW()");
        const currentTimeString = currentTimeResult[0]['NOW()'];
        const currentTime = new Date(currentTimeString);
        const formattedCurrentTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');
        console.log('Formatted Current Time:', formattedCurrentTime);
        const newTime = addMinutes(subDays(currentTime, 1), 15);
        const formattedNewTime = format(newTime, 'yyyy-MM-dd HH:mm:ss');
        console.log('Formatted New Time (after 15 minutes):', formattedNewTime);


        const banner = await dataBase.executeQuery(`SELECT * FROM iris.banner ORDER BY id DESC LIMIT 10;`)
        console.log(banner);
        const idString = String(banner[0].id);
        console.log("Retrived Id = " + idString);
        const updateBanner = await dataBase.executeQuery(`update iris.banner set date_activate='${formattedNewTime}',date_deactivate='${formattedNewTime}' where id=${idString};`)
        console.log(updateBanner);



    } catch (error) {
        console.log("Not executed " + error);
    }
}



async function updatetableForAnnoncement() {
    try {
        const currentTimeResult = await dataBase.executeQuery("SELECT NOW()");
        const currentTimeString = currentTimeResult[0]['NOW()'];
        const currentTime = new Date(currentTimeString);
        const formattedCurrentTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');
        console.log('Formatted Current Time:', formattedCurrentTime);
        const newTime = addMinutes(subDays(currentTime, 1), 15);
        const formattedNewTime = format(newTime, 'yyyy-MM-dd HH:mm:ss');
        console.log('Formatted New Time (after 15 minutes):', formattedNewTime);
        const banner = await dataBase.executeQuery(`SELECT * FROM iris.announcement ORDER BY id DESC LIMIT 10;`)
        console.log(banner);
        const idString = String(banner[0].id);
        console.log("Retrived Id = " + idString);
        const updateBanner = await dataBase.executeQuery(`update iris.banner set date_activate='${formattedNewTime}',date_deactivate='${formattedNewTime}' where id=${idString};`)
        console.log(updateBanner);
    } catch (error) {
        console.log("Not executed " + error);
    }

}

async function updateCertificationComplianceFlow() {
let retriveID = await dataBase.executeQuery(` SELECT * FORM iris.cron_master WHERE name = 'Autoregister' AND portal = '1';`)
    /* select * from iris.cron_master where name = 'Autoregister' and portal = '1';
    #retrive  id from select query
update iris.cron_master set status = '1' where id = '8';

    select * from iris.cron_details where name = 'LearningPlan and Certification AutoRegister' and portal_id = 1;
    #need to retrive id from select query
update iris.cron_details set current_status = 'waiting', previous_status = 'NULL', status = '1' where id = '21';
    SELECT * FROM iris.program_enrollment ORDER BY id DESC LIMIT 1;
update iris.program_enrollment set completion_date = '2024-07-16 10:27:27'  where id = 61;
update iris.cron_details set next_run = '2024-07-18 06:15:27', current_status = 'waiting', previous_status = 'processing'  where cron_id = 18;
    select * from iris.program_enrollment where id = 61; */


}

export { updateCronForEnrollment, updatecronForBanner, updatetableForAnnoncement }