import { test } from "../../customFixtures/expertusFixture";
import { FakerData } from "../../utils/fakerUtils";




test(`Verify the manager can recommend the course to user`,async({learnerHome,managerHome})=>{
    test.info().annotations.push(
        { type: `Author`, description: `vidya` },
        { type: `TestCase`, description: `Manager verification` },
        { type: `Test Description`, description: `Verify the manager can recommend the course to user` }
    );
    await learnerHome.learnerLogin("MANAGERNAME", "DefaultPortal");
    await learnerHome.selectCollaborationHub();
    

    })

