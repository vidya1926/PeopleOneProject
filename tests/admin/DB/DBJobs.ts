
import DB from "../../../utils/dbUtil";
import { format, addMinutes, addDays, subDays } from 'date-fns';

const dataBase = new DB();

async function autoRegister() {
    let AutoRegister = await dataBase.executeQuery(` SELECT * FROM cron_master WHERE name = 'Autoregister' and portal_id='1'`);
    let retriveAutoRegisterID = String(AutoRegister[0].id);
    console.log("Retrived registerId is : " + retriveAutoRegisterID);
    let updatedAutoRegister = await dataBase.executeQuery(`UPDATE cron_master SET status='1' WHERE id ='${retriveAutoRegisterID}'`);
    console.log(updatedAutoRegister);


}
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
        const announcement = await dataBase.executeQuery(`SELECT * FROM announcement ORDER BY id DESC LIMIT 1;`);
        console.log(announcement);
        const idString = String(announcement[0].id);
        console.log("Retrived Id = " + idString);
        const updateAnnouncement = await dataBase.executeQuery(`UPDATE announcement SET from_date='${formattedNewTime}',to_date='${formattedNewTime}' WHERE id=${idString};`);
        console.log(updateAnnouncement);
    } catch (error) {
        console.log("Not executed " + error);
    }

}

async function updateCertificationComplianceFlow() {
    await autoRegister();
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
    await autoRegister();
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


async function courseEnrollmentCron() {
    await autoRegister();
    const currentTimeResult = await dataBase.executeQuery("SELECT NOW()");
    const currentTimeString = currentTimeResult[0]['NOW()'];
    const currentTime = new Date(currentTimeString);
    console.log("Current Time : " + currentTime);
    const newTime = (subDays(currentTime, 1));
    const previousDate = format(newTime, 'yyyy-MM-dd');
    console.log("Previous Date :" + previousDate);
    let lastRecord = await dataBase.executeQuery(`SELECT * FROM catalog_compliance ORDER BY id DESC LIMIT 1;`);
    let latestId = lastRecord[0].id;
    console.log(latestId);
    await dataBase.executeQuery(`UPDATE catalog_compliance SET complete_date=('${previousDate}') WHERE  id='${latestId}';`);
    await dataBase.executeQuery(`UPDATE cron_master SET status=1 WHERE name='Enrollment Updates';`);
    const cronRunTime = new Date(currentTime.getTime() - 15 * 60 * 1000);
    const subTime = format(cronRunTime, 'yyyy-MM-dd HH:mm:ss');
    console.log('Formatted New Time (15 mins subtracted):', subTime);
    let enrollmentUpdate = await dataBase.executeQuery(`UPDATE cron_details SET next_run='${subTime}',current_status='waiting',previous_status='processing' where name='Course Enrollment Update'`);
    console.log(enrollmentUpdate);


}


export { courseEnrollmentCron, updateCronForEnrollment, updatecronForBanner, updatetableForAnnoncement, updateCertificationComplianceFlow, updateSingleInstanceAutoRegister }