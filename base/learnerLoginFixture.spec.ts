import { test } from '../customFixtures/expertusFixture';


test.skip(`Login to Expertus`, async ({ learnerLogin }) => {
  const title = await learnerLogin.getTitle();
  console.log(title)
})