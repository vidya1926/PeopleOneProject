import DB from "../../../utils/dbUtil";
import { test } from "../../../customFixtures/expertusFixture"
import { format, addMinutes, addDays, subDays } from 'date-fns';


test('fetch data from database', async () => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `fetch data from database` },
        { type: `Test Description`, description: `Database` }
    );
    const dataBase = new DB();
    try {
        const currentTimeResult = await dataBase.executeQuery("SELECT NOW()");
        const currentTimeString = currentTimeResult[0]['NOW()'];
        const currentTime = new Date(currentTimeString);
        const newTime = new Date(currentTime.getTime() - 15 * 60 * 1000);
        console.log(newTime);
    } catch (error) {
        console.log("Not executed " + error);
    }
});


