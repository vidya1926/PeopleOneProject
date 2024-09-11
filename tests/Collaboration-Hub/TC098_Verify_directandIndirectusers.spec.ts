import { credentials } from "../../constants/credentialData";
import { test } from "../../customFixtures/expertusFixture";


const dataSets = [
    { user:credentials.TEAMUSER2.username, reportee: "Virtual" },
    { user: credentials.TEAMUSER1.username, reportee: "Direct" }
];

for(const value of dataSets){
test(`Verify the manager can recommend the course to user ${value.user}`,async({learnerHome,managerHome})=>{
    test.info().annotations.push(
        { type: `Author`, description: `vidya` },
        { type: `TestCase`, description: `Manager verification` },
        { type: `Test Description`, description: `Verify the manager can recommend the course to user` }
    );
    await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
    await learnerHome.selectCollaborationHub();
    await managerHome.clickFilter(value.reportee);
    await managerHome.verifyReportee(value.user,value.reportee) 
    })
    }

