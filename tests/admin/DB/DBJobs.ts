
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
        const programEnrollment = await dataBase.executeQuery(`SELECT * FROM program_enrollment ORDER BY id DESC LIMIT 1;`)
        console.log(programEnrollment);

        const idString = String(programEnrollment[0].id);
        console.log("Retrived Id = " + idString);

        //Query to UPDATE the ProgramEnrollment 
        const updateProgramEnrollment = await dataBase.executeQuery(`UPDATE program_enrollment SET completion_date='${formattedPreviousDate}' WHERE id='${idString}';`)
        console.log(updateProgramEnrollment);
        const verification = await dataBase.executeQuery(`SELECT * FROM program_enrollment WHERE id=61 ;`)
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


        const banner = await dataBase.executeQuery(`SELECT * FROM banner ORDER BY id DESC LIMIT 10;`)
        console.log(banner);
        const idString = String(banner[0].id);
        console.log("Retrived Id = " + idString);
        const updateBanner = await dataBase.executeQuery(`update banner set date_activate='${formattedNewTime}',date_deactivate='${formattedNewTime}' where id=${idString};`)
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
        const banner = await dataBase.executeQuery(`SELECT * FROM announcement ORDER BY id DESC LIMIT 10;`);
        console.log(banner);
        const idString = String(banner[0].id);
        console.log("Retrived Id = " + idString);
        const updateBanner = await dataBase.executeQuery(`update banner set date_activate='${formattedNewTime}',date_deactivate='${formattedNewTime}' where id=${idString};`);
        console.log(updateBanner);
    } catch (error) {
        console.log("Not executed " + error);
    }

}

async function updateCertificationComplianceFlow() {
    let AutoRegister = await dataBase.executeQuery(` SELECT * FROM cron_master WHERE name = 'Autoregister'`);
    let retriveAutoRegisterID = String(AutoRegister[0].id);
    console.log("Retrived registerId is : " + retriveAutoRegisterID);
    await dataBase.executeQuery(`UPDATE cron_master SET status='1' WHERE id ='${retriveAutoRegisterID}'`);

    let learningPlanAndCertification = await dataBase.executeQuery(`SELECT * FROM cron_details WHERE name = 'LearningPlan and Certification AutoRegister' AND portal_id = 1;`);
    let retriveLearningPlanId = String(learningPlanAndCertification[0].id);
    console.log("Retrived learningPlanId is : " + retriveLearningPlanId);

    const currentTimeResult = await dataBase.executeQuery("SELECT NOW()");
    const currentTimeString = currentTimeResult[0]['NOW()'];
    const currentTime = new Date(currentTimeString);
    const pastDate = currentTime.setDate(currentTime.getDate() - 2);
    const formattedPreviousDate = format(pastDate, 'yyyy-MM-dd HH:mm:ss');
    console.log(formattedPreviousDate);
    const newTime = new Date(currentTime.getTime() - 15 * 60 * 1000);
    const formattedNewTime = format(newTime, 'yyyy-MM-dd HH:mm:ss');
    console.log('Formatted New Time (15 mins subtracted):', formattedNewTime);
    let updateLearningPlan = await dataBase.executeQuery(`UPDATE cron_details SET next_run='${formattedNewTime}',current_status='waiting',previous_status='processing'  WHERE cron_id='${retriveLearningPlanId}';`);
    console.log(updateLearningPlan);
}



async function updateSingleInstanceAutoRegister() {
    let AutoRegister = await dataBase.executeQuery(` SELECT * FROM cron_master WHERE name = 'Autoregister'`);
    let retriveAutoRegisterID = String(AutoRegister[0].id);
    console.log("Retrived registerId is : " + retriveAutoRegisterID);
    await dataBase.executeQuery(`UPDATE cron_master SET status='1' WHERE id ='${retriveAutoRegisterID}'`);

    let learningPlanAndCertification = await dataBase.executeQuery(`SELECT * FROM cron_details WHERE name = 'Course Autoregister' AND portal_id = 1;`);
    let retriveLearningPlanId = String(learningPlanAndCertification[0].id);
    console.log("Retrived learningPlanId is : " + retriveLearningPlanId);

    const currentTimeResult = await dataBase.executeQuery("SELECT NOW()");
    const currentTimeString = currentTimeResult[0]['NOW()'];
    const currentTime = new Date(currentTimeString);
    const newTime = new Date(currentTime.getTime() - 15 * 60 * 1000);
    const formattedNewTime = format(newTime, 'yyyy-MM-dd HH:mm:ss');
    console.log('Formatted New Time (15 mins subtracted):', formattedNewTime);

    let updateLearningPlan = await dataBase.executeQuery(`UPDATE cron_details SET next_run='${formattedNewTime}',current_status='waiting',previous_status='processing'  WHERE cron_id='${retriveLearningPlanId}';`);
    console.log(updateLearningPlan);



}


export { updateCronForEnrollment, updatecronForBanner, updatetableForAnnoncement, updateCertificationComplianceFlow, updateSingleInstanceAutoRegister }