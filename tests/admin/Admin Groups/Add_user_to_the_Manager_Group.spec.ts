import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';

test.use({ storageState: "logins/expertusAdminLog.json" })
test(`Course Creation for Classroom`, async ({ adminHome, createCourse, editCourse }) => {
    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Add_user_to_the_Manager_Group` },
        { type:`Test Description`, description: `` }
        
    );
        

});