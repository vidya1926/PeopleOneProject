import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from '../../../utils/fakerUtils';


const title = FakerData.getcertificationTitle();

test(`Verify that able to create a new certificate and also able to edit the new and existing certificate`, async ({ adminHome, CompletionCertification }) => {

    test.info().annotations.push(
        { type: `Author`, description: `Ajay Michael` },
        { type: `TestCase`, description: `Verify that able to create a new certificate and also able to edit the new and existing certificate` },
        { type: `Test Description`, description: `Creating a new certificate and editing the new and existing certificate` }
    );
    await adminHome.menuButton();
    await adminHome.clickLearningMenu();
    await adminHome.clickCompletionCertification();
    await CompletionCertification.clickCreateCompletionCertificate();
    await CompletionCertification.verify_CompletionCertificateLabel();
    await CompletionCertification.title(title);
    await CompletionCertification.designCertificate(FakerData.getDescription());
    await CompletionCertification.clickPublish();
    await CompletionCertification.clickProceed();
    await CompletionCertification.title(title+" "+"test");
    await CompletionCertification.clickUpdate();
    await CompletionCertification.verifyCeritificateSuccessMessage();
    
})