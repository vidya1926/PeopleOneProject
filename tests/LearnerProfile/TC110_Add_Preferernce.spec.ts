import { test } from '../../customFixtures/expertusFixture'
import { FakerData } from '../../utils/fakerUtils';
import { readDataFromCSV } from '../../utils/csvUtil';
import { updateFieldsInJSON } from '../../utils/jsonDataHandler';



//test.use({ storageState: "logins/expertusAdminLog.json"})
test(`TC001_CreateCourseFor Single Instance`, async ({ learnerHome, profile, createUser }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Vidya` },
        { type: `TestCase`, description: `Adding Preference Details` },
        { type: `Test Description`, description: `Verify that learner can add the preference details successfully` }


    );

    const csvFilePath = './data/User.csv';
    const data = await readDataFromCSV(csvFilePath);
    for (const row of data) {
        const { country, state, timezone, currency, city, zipcode } = row;
        {
            await learnerHome.learnerLogin("LEARNERUSERNAME", "Portal");
            await profile.clickProfile();
            await profile.preferenceTab();
            await profile.preferenceTimeZone("GMT");
            await profile.selectLanguage("English")
            await profile.selectCurrency()
            await profile.selectCountry()
            await profile.city("Kapisa")
            await profile.selectDateFormat();
            await profile.selectDetailsPage()
         // await profile.ceuType("Recontextualize ROI")  --> CEU Dropdown is not populated with data
            await profile.creditPeriod("March")
            await profile.creditScore()
            await profile.address1("testleaf")
            await profile.address2("qeagle")
            await profile.zipcode("635602")
            await profile.mobile()
            await profile.phone()
            await profile.selectDepartment()
            await profile.employeeId()
            await profile.selectEmployeeType();
            await profile.selectJobRole();
            await profile.selectJobTitle();
            await profile.selectOrganization()
            await profile.selectUserType()
            await profile.clickSave()

        }
    }



})