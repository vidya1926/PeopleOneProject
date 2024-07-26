import data from "../data/adminGroupsData.json"

const managerName:any=(data.managerName).toString();
const commonUser:any=(data.commonUser).toString();
export let credentials = {
    CUSTOMERADMIN: {
        username: "customadmin",
        password: "Welcome1@"
    },
    LEARNERADMIN: {
        username: "robretcollin@people.co",
        password: "Welcome1@"
    },
    INSTRUCTORNAME: {
        username: "arivazhaganp",
        password: "Welcome1@"
    },
    MANAGERNAME: {
        username: managerName,
        password: "Welcome1@"
    },
    LEARNERUSERNAME: {
        username: "learneruser1",
        password: "Welcome1@"
    },
    COMMERCEADMIN: {
        username: "commerceadmin",
        password: "Welcome1@"
    },
    SUPERADMIN:{
        username:"admin",
        password:"Welcome1@"
    },
    PEOPLEADMIN:{
        username:'peopleadmin',
        password:'Welcome1@'
    },
    LEARNERPORTAL_User:{
        username:'johnMathew',
        password:'Welcome1@'
    },
    LEARNERPORTAL_2User:{
        username:'Retta44@gmail.com',
        password:'Welcome1@',
    },

    COMMONUSER:{
        username:commonUser,
        password:"Welcome1@"
    },

};