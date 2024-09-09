import { test } from "../../customFixtures/expertusFixture";
import { FakerData } from "../../utils/fakerUtils";


const dataSets = [
    { user: "User2", reportee: "Virtual" },
    { user: "Kira Daniel", reportee: "Direct" }
];

for(const data of dataSets){
test(`Verify the manager can recommend the course to user ${data.user}`,async({learnerHome,managerHome})=>{
    test.info().annotations.push(
        { type: `Author`, description: `vidya` },
        { type: `TestCase`, description: `Manager verification` },
        { type: `Test Description`, description: `Verify the manager can recommend the course to user` }
    );
    await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
    await learnerHome.selectCollaborationHub();
    await managerHome.clickFilter(data.reportee)
    await managerHome.verifyReportee(data.user,data.reportee) 
    })
    }

