import { test } from '../customFixtures/expertusFixture';


test(`Login to Expertus`, async ({ adminLogin }) => {
  const title = await adminLogin.getTitle();
  console.log(title)
})