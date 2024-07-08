import {test} from"../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";

const categoryName: any =FakerData.getCategory();
test(`Verify that a category can be added under Metadata Library - Learning - Category`,async({ adminHome,metadatalibrary})=>{
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Verify that a category can be added under Metadata Library - Learning - Category' },
        { type:'Test Description', description:"Creating a category in the Metadata Library within the Learning Category"}
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_ECommerce();
   // await 


})