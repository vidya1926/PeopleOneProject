import { FakerData, getcardExpiryDate, getCreditCardNumber, getCVV, getPonumber } from "../utils/fakerUtils";
import { LearnerHomePage } from "./LearnerHomePage";

export class CostcenterPage extends LearnerHomePage {
    public selectors = {
        ...this.selectors,
        firstName: `//label[text()='First Name']/following-sibling::input`,
        lastName: `//label[text()='Last Name']/following-sibling::input`,
        address: `//label[text()='Address1']/following-sibling::input`,
        countrySelect: `//label[text()='Country']/following::button[@data-id='country']`,
        ddOption: `//div[@class='dropdown-menu show']//input[@aria-label='Search']`,
        countryName: (countryName: string) => `//span[text()= '${countryName}']`,
        stateField: `//div[@id='wrapper-state']//button[@data-id='state']`,
        cityTown: `//label[text()='City/Town']/following-sibling::input`,
        zipcode: `//label[text()='Zip Code']/following-sibling::input`,
        paymentMode: `//div[@id='wrapper-payment_mode']`,
        paymentOption: (option: number) => `(//div[@id='wrapper-payment_mode']/following::ul//a)[${option}]`,
        paymentMethod: (option: string) => `//span[text()='${option}']`,
        cardNumber: `//label[text()='Card Number']/following-sibling::input`,
        expiryDate: `//label[text()='Expiration Date']/following-sibling::input`,
        cvvNumber:`(//span[text()='cvv']/following::input)[1]`,
        poNumber: `//label[text()='PO number:']/following-sibling::input`,
        termsAndCondition:`//label[text()=' I agree to the ']/i[2]`,
        checkOut:`//button[text()='check out']`,
         savedAddress: `//label[text()='Address Name']/following::div/input`,
        createButton:`//button[text()='create']`,
        successMsg:`//h3[contains(text(),' Thank you for your order')]`
    };



    public async enterUserdetails() {
        await this.type(this.selectors.firstName, "FirstName", FakerData.getFirstName())
        await this.type(this.selectors.lastName, "LastName", FakerData.getLastName())
        await this.type(this.selectors.address, "Address", FakerData.getAddress())

    }

    public async selectCountry(countryName: string) {
        await this.click(this.selectors.countrySelect, "Country", "Dropdown")
        await this.type(this.selectors.ddOption, "Country", countryName)
        await this.mouseHover(this.selectors.countryName(countryName), "Country")
        await this.click(this.selectors.countryName(countryName), "Country", "Option")
    }

    public async selectCity(cityName: string) {

        await this.click(this.selectors.stateField, "state", "Dropdown")
        await this.type(this.selectors.ddOption, "state", cityName)
        await this.mouseHover(this.selectors.countryName(cityName), "City/Town")
        await this.click(this.selectors.countryName(cityName), "city/Town", "Option")
        await this.type(this.selectors.zipcode, "Zipcode",getPonumber() )
    }

    public async paymentMethod(payMode: string) {
        await this.validateElementVisibility(this.selectors.paymentMode,"Payment mode")
        await this.click(this.selectors.paymentMode, "Payment Mode", "Field")
        await this.click(this.selectors.paymentMethod(payMode), "Payment Mode", "Option")
    }

    public async fillCredeitDetails(){
        await this.type(this.selectors.cardNumber,"Card Number", getCreditCardNumber())
        await this.type(this.selectors.expiryDate,"Expiry Date", getcardExpiryDate())
        await this.type(this.selectors.cvvNumber,"CVV number", getCVV())
    }

   public async enterPOnumber(){
            await this.type(this.selectors.poNumber,"PO Number",getPonumber())
   }

   public async clickTermsandCondition(){
    await this.click(this.selectors.termsAndCondition,"TermsandCondition","Checkbox")
}

    public async clickCheckout(){
        await this.click(this.selectors.checkOut,"checkout","button")
    }

    public async clickCreate(){
        await this.click(this.selectors.createButton,"Create","button")
    }

    public async verifySuccessMsg(){
        await this.validateElementVisibility(this.selectors.successMsg,"toastMessage")
        await this.verification(this.selectors.successMsg,"Successfully")
    }

}