import { test as baseTest } from '@playwright/test'
import { AdminLogin } from '../pages/AdminLogin'
import { AdminHomePage } from '../pages/AdminHomePage'
import { LearnerLogin } from '../pages/LearnerLogin'
import { LearnerHomePage } from '../pages/LearnerHomePage'
import { CatalogPage } from '../pages/CatalogPage'
import { credentialConstants } from "../constants/credentialConstants";
import { reg_createUser, user } from "../api_Integration/reg_createUser"
import { CoursePage } from '../pages/CoursePage'
import { UserPage } from '../pages/UserPage'
import { MetaLibraryPage } from '../pages/MetaLibraryPage'
import { EditCoursePage } from '../pages/editCoursePage'
import {AdminGroupPage} from '../pages/AdminGroupPage'
import {OrganizationPage} from '../pages/OrganizationPage'
import{LocationPage} from '../pages/LocationPage'
import { LearnerCoursePage } from '../pages/LearnerCoursePage'

type expertusFixture = {
    adminLogin: AdminLogin
    adminHome: AdminHomePage
    createUser: UserPage
    createCourse: CoursePage
    editCourse: EditCoursePage
    learnercourse:LearnerCoursePage
    location:LocationPage
    learnerLogin: LearnerLogin
    learnerHome: LearnerHomePage
    catalog: CatalogPage
    organization:OrganizationPage
    metadatalibrary:MetaLibraryPage
    adminGroup:AdminGroupPage
   
}


export const test = baseTest.extend<expertusFixture>({
    adminLogin: async ({ page, context }, use) => {
        const adLogin = new AdminLogin(page, context);
        await adLogin.adminLogin(credentialConstants.CUSTOMERADMIN, credentialConstants.PASSWORD)
        await use(adLogin);
        //console.log("Login is verified")
        
    },
    learnerLogin: async ({ page, context }, use) => {
        const lnLogin = new LearnerLogin(page, context);
        await lnLogin.learnerLogin(credentialConstants.LEARNERUSERNAME,credentialConstants.PASSWORD);
        await use(lnLogin);
        console.log("Login is verified");
        
    },
    adminHome: async ({ page, context }, use) => {
        const adHome = new AdminHomePage(page, context);
        await use(adHome);
    },
    createUser: async ({ page, context }, use) => {
        const createUser = new UserPage(page, context);
        await use(createUser);
    },
    createCourse: async ({ page, context }, use) => {
        const createCourse = new CoursePage(page, context);
        await use(createCourse);
    },
    editCourse: async ({ page, context }, use) => {
        const editCourse = new EditCoursePage(page, context);
        await use(editCourse);
    },
    location: async ({ page, context }, use) => {
        const location = new LocationPage(page, context);
        await use(location);
    },
    


    learnerHome: async ({ page, context }, use) => {
        const learnerHome = new LearnerHomePage(page, context);
        await use(learnerHome);
    },
    catalog: async ({ page, context }, use) => {
        const catalog = new CatalogPage(page, context);
        await use(catalog);
    },
    learnercourse: async ({ page, context }, use) => {
        const learnerCourse = new LearnerCoursePage(page, context);
        await use(learnerCourse);
    },
    metadatalibrary: async ({ page, context }, use) => {
        const metadatalibrary = new MetaLibraryPage(page, context);
        await use(metadatalibrary);
    },

    adminGroup:async({ page, context }, use) => {
        const adminGroup = new AdminGroupPage(page, context);
        await use(adminGroup);
    },
    organization: async ({ page, context }, use) => {
        const organization = new OrganizationPage(page, context);
        await use(organization);
    }
    
   
})