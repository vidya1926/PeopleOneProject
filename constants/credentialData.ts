import data from "../data/adminGroupsData.json"

const managerName: any = data.managerName
const commonUser: any = data.commonUser
const internalUser:any=data.internalUser
const externalUser:any=data.externalUser
const teamUser1:any=data.teamUser1
const teamUser2:any=data.teamUser2

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
        username: "managerUser",
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
    SUPERADMIN: {
        username: "admin",
        password: "Welcome1@"
    },
    PEOPLEADMIN: {
        username: 'peopleadmin',
        password: 'Welcome1@'
    },
    LEARNERPORTAL_User: {
        username: 'johnMathew',
        password: 'Welcome1@'
    },
    LEARNERPORTAL_2User: {
        username: 'Retta44@gmail.com',
        password: 'Welcome1@',
    },
    COMMONUSER: {
        username: commonUser,
        password: "Welcome1@"
    },
    ENROLLADMIN: {
        username: "enrollAdmin",
        password: "Welcome1@"
    },
    NEWCUSTOMERADMIN: {
        username: "newcustomadmin",
        password: "Welcome1@"
    },
    INTERNALUSER: {
        username:internalUser ,
        password: "Welcome1@"
    },
    EXTERNALUSER: {
        username:externalUser,
        password: "Welcome1@"
    },
    TEAMUSER1:{
         username:teamUser1,
        password: "Welcome1@"

    }, TEAMUSER2:{
         username:teamUser2,
        password: "Welcome1@"

    }
};