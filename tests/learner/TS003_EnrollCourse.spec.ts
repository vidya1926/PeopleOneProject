import {test} from "../../customFixtures/expertusFixture";

const courseName="Neural Firewall Connect"
 test.beforeEach("Create new user ",async({learnerLogin})=>{
     await learnerLogin.getTitle();
    
})
//test.use({ storageState: "logins/expertuslearnerLog.json"})
test('Registering a learner on the platform',async({catalog,learnerHome})=>{
    
    await learnerHome.isSignOutVisible();
    await learnerHome.clickMenu("Catalog");
    await catalog.mostRecent("Most Recent");
    await catalog.searchCatalog("exp-searchcatalog-search-field",courseName);
    await catalog.clickEnrollButton(courseName,"ENROLL");
    await catalog.clickLaunchButton("Launch Content");
    await learnerHome.clickMenu("My Learning");
    await catalog.clickCompletedButton("Completed");
    await catalog.verifyCompletedCourse(courseName);
    })