import {test} from"../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";

const categoryName: any =FakerData.getCategory();
test.skip(`Verify that a category can be added under Metadata Library - E-Commerce - Category`,async({ adminHome,metadatalibrary})=>{
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Verify that a category can be added under Metadata Library - E-Commerce - Category' },
        { type:'Test Description', description:"Creating a category in the Metadata Library within the E-Commerce Category"}
    );
    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.meta_ECommerce(); 
    await metadatalibrary.clickOnTypeAndSelectType("Learning Path");
    await metadatalibrary.clickAddAnotherPolicy();
})