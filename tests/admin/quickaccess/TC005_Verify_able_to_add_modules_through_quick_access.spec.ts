import { test } from "../../../customFixtures/expertusFixture"
import { FakerData } from "../../../utils/fakerUtils";

const categoryName: any = FakerData.getCategory();
test(`TC005 Verify able to add modules through quick access `, async ({ adminHome, metadatalibrary }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Ajay Michael' },
        { type: 'TestCase', description: 'Verify able to add modules through quick access ' },
        { type: 'Test Description', description: "add modules through quick access " }
    );

})