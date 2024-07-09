import { test } from "../../../customFixtures/expertusFixture";
import { FakerData } from "../../../utils/fakerUtils";

test(`Verify that language can be selected based on the list of languages under Metadata Library - General - Language`, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'verify that a department can be added under Metadata Library - General - Language' },
        { type: 'Test Description', description: "Creating a department in the Metadata Library within the General Language" }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.metaGeneralLink();
    await metadatalibrary.clickLanuageExpandButton();
    await metadatalibrary.clickCheckBox();

})

let equipment=FakerData.equipmentName();
test(`Verify that language can be selected based on the list of languages under Metadata Library - General - Equipment`, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'verify that a department can be added under Metadata Library - General - Equipment' },
        { type: 'Test Description', description: "Creating a department in the Metadata Library within the General Equipment" }
    );

    await adminHome.loadAndLogin("CUSTOMERADMIN")
    await adminHome.isSignOut();
    await adminHome.menuButton();
    await adminHome.metadataLibrary();
    await adminHome.metaGeneralLink();
    await metadatalibrary.equipmentExpandButton();
    await metadatalibrary.clickAddEquipment();
    await metadatalibrary.enterEquipmentName(equipment);
    await metadatalibrary.saveButton()
    await metadatalibrary.verifyEquipment(equipment);

})