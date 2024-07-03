import { expect } from '@playwright/test';
import { test } from '../customFixtures/expertusFixture';
let userId: any


test(`Create a User`, async ({ request }) => {
    const response = await request.post("https://learn.e1cloudqa.com/ajax/admin/people/user/create", {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Connection": "keep-alive"

        },
        form: {
            access: "1,2,9,34,45,70,78,101,114,115,116,119,121,123,128,129,131,132,133,134,135,136,140,141,143,144,146,147,149,150,157,160,170,178,180,181,187,190,191",
            first_name: "King",
            last_name: "Luther",
            full_name: "King Luther",
            username: "luther",
            password: "Welcome1@",
            email: "luther@gmail.com",
            status: "Active",
            addr1: "test1",
            addr2: "test2",
            city: "Chennai",
            state: "IN-TN",
            country: "IN",
            state_name: "Tamil Nadu",
            country_name: "India",
            zip: "600031",
            time_zone: "tmz_0303",
            phone_no: "9876543213",
            mobile_no: "9876543219",
            preferred_language: "English",
            preferred_currency: "Indian Rupee"
        }
    });
    const responseData = await response.json();
    userId = responseData.user_id
    


})


test.skip(`Get User Record`, async ({ request }) => {
    //const requestCall = page.request;

    const Userresponse = await request.get(`https://learn.e1cloudqa.com/ajax/admin/people/user/check_user_enrollment?userId=${userId}`,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Connection": "keep-alive"

            },
            form: {
                "username": "admin",
                "password": "Welcome1@"
            },

        });

    const res = await Userresponse.json();
    const status = Userresponse.status()
    expect(status).toEqual(200);
    console.log("Printing successful!");
    console.log(res)

})



