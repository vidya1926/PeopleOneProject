
import {test} from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';
import { LearnerHomePage } from "../../../pages/LearnerHomePage";
import { time } from "console";
import { ProfilePage } from "../../../pages/ProfilePage";
import { fakerDA } from "@faker-js/faker";


const  Skillset =FakerData.getRandomSkill();
const city=FakerData.getLocationName()
const Mnumber=FakerData.getMobileNumber();
const Pnumber=FakerData.getMobileNumber();




const timezone='(GMT-11:00) Samoa Standard Time/Midway'
//test.use({ storageState: "logins/expertusAdminLog.json"})
test(`TC001_CreateCourseFor Single Instance`,async({learnerLogin,profile})=>{

    test.info().annotations.push(
        { type: `Author`, description: `Jagadish` },
        { type: `TestCase`, description: `Adding Preference Details` },
        { type:`Test Description`, description: `Verify that learner can add the preference details successfully` }
    
        
    );

    await profile.isSignOutVisible();
    await profile.clickProfile();
    await profile.preferenceTab();
    await profile.preferenceTimeZone(timezone);
    await profile.selectLanguage()
    await profile.selectCurrency()
    await profile.selectCountry()
    //await profile.selectState()
    await profile.city("Kapisa")
    await profile.selectDateFormat();
    await profile.selectDetailsPage()
    //await profile.CreditPeriod("March")
    await profile.CreditScore("100")
    await profile.address1("testleaf")
    await profile.address2("qeagle")
    await profile.zipcode("635602")
    await profile.mobile(Mnumber)
    await profile.phone(Pnumber)
    await profile.selectDepartment()
    await profile.employeeId("20")
    await profile.selectEmployeeType();
    await profile.selectJobRole();
    await profile.selectJobTitle();
    await profile.selectOrganization()
    await profile.selectUserType()
    await profile.ClickSave()
    

    
    

    





    
















})