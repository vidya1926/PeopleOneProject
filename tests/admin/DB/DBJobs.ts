
import DB from "../../../utils/dbUtil";
import { format, addMinutes, addDays, subDays } from 'date-fns';

const dataBase = new DB();
async function updateCronForEnrollment(){
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

}
async function updatecronForBanner(){
    try{
   const currentTimeResult = await dataBase.executeQuery("SELECT NOW()");
   const currentTimeString = currentTimeResult[0]['NOW()'];
   const currentTime = new Date(currentTimeString);
   const formattedCurrentTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');
   console.log('Formatted Current Time:', formattedCurrentTime);        
   const newTime = addMinutes(subDays(currentTime,1), 15);        
   const formattedNewTime= format(newTime, 'yyyy-MM-dd HH:mm:ss');           
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



async function updatetableForAnnoncement(){
    try{
   const currentTimeResult = await dataBase.executeQuery("SELECT NOW()");
   const currentTimeString = currentTimeResult[0]['NOW()'];
   const currentTime = new Date(currentTimeString);
   const formattedCurrentTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');
   console.log('Formatted Current Time:', formattedCurrentTime);        
   const newTime = addMinutes(subDays(currentTime,1), 15);        
   const formattedNewTime= format(newTime, 'yyyy-MM-dd HH:mm:ss');           
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


export {updateCronForEnrollment,updatecronForBanner,updatetableForAnnoncement}