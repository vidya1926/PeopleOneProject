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
import { EditCoursePage } from '../pages/EditCoursePage'
import { AdminGroupPage } from '../pages/AdminGroupPage'
import { OrganizationPage } from '../pages/OrganizationPage'
import { LocationPage } from '../pages/LocationPage'
import { CommerceHomePage } from '../pages/CommerceHomePage'
import { LearningPathPage } from '../pages/LearningPathPage'
import { CompletionCertificationPage } from '../pages/CompletionCertificationPage'
import { LearnerDashboardPage } from '../pages/LearnerDashboardPage'
import DB from '../utils/dbUtil'
import { BannerPage } from '../pages/BannerPage'
import { CostcenterPage } from '../pages/CostcenterPage'
import { AnnouncementPage } from '../pages/AnnouncementPage'
import { ContentHomePage } from '../pages/ContentPage'
import { LearnerCoursePage } from '../pages/LearnerCoursePage'
import { SurveyAssessmentPage } from '../pages/SurveyAssessmentPage'
import {ProfilePage} from '../pages/ProfilePage'
import { EnrollmentPage } from '../pages/EnrollmentPage'
import { InstructorPage } from '../pages/InstructorPage'
import { ManagerPage } from '../pages/ManagerPage'
import { ReadContentPage } from '../pages/ReadContentPage'


// import { LearnerCoursePage } from '../pages/LearnerCoursePage'

type expertusFixture = {
    // adminLogin: AdminLogin
    adminHome: AdminHomePage
    createUser: UserPage
    createCourse: CoursePage
    editCourse: EditCoursePage
    learningPath: LearningPathPage
    CompletionCertification: CompletionCertificationPage
    location: LocationPage
    learnerLogin: LearnerLogin
    learnerHome: LearnerHomePage
    learnerCourse: LearnerCoursePage
    catalog: CatalogPage
    SurveyAssessment: SurveyAssessmentPage
    dashboard: LearnerDashboardPage
    organization: OrganizationPage
    metadatalibrary: MetaLibraryPage
    adminGroup: AdminGroupPage
    commercehome: CommerceHomePage
    bannerHome: BannerPage
    dataBase: DB
    costCenter: CostcenterPage
    announcementHome: AnnouncementPage
    contentHome: ContentHomePage
    profile:ProfilePage
    enrollHome:EnrollmentPage
    instructorHome:InstructorPage
    managerHome:ManagerPage
    readContentHome:ReadContentPage
}
export const test = baseTest.extend<expertusFixture>({
   /*  adminLogin: async ({ page, context }, use) => {
        const adLogin = new AdminLogin(page, context);
        await adLogin.adminLogin()
        await use(adLogin);
        //console.log("Login is verified"        
    }, */

    adminHome: async ({ page, context }, use,) => {
        const adminHome = new AdminHomePage(page, context);
        await use(adminHome);
    },

    learnerLogin: async ({ page, context }, use) => {
        const lnLogin = new LearnerLogin(page, context);
        // await lnLogin.learnerLogin(credentialConstants.LEARNERUSERNAME, credentialConstants.PASSWORD);
        // await use(lnLogin);
        console.log("Login is verified");

    },
    CompletionCertification: async ({ page, context }, use) => {
        const CompletionCertification = new CompletionCertificationPage(page, context);
        await use(CompletionCertification);
    },

    createUser: async ({ page, context }, use) => {
        const createUser = new UserPage(page, context);
        await use(createUser);
    },
    createCourse: async ({ page, context }, use) => {
        const createCourse = new CoursePage(page, context);
        await use(createCourse);
    },
    learningPath: async ({ page, context }, use) => {
        const learningPath = new LearningPathPage(page, context);
        await use(learningPath);
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
    learnerCourse: async ({ page, context }, use) => {
        const learnercourse = new LearnerCoursePage(page, context);
        await use(learnercourse);
    },
    SurveyAssessment: async ({ page, context }, use) => {
        const SurveyAssessment = new SurveyAssessmentPage(page, context);
        await use(SurveyAssessment);
    },
    catalog: async ({ page, context }, use) => {
        const catalog = new CatalogPage(page, context);
        await use(catalog);
    },
    dashboard: async ({ page, context }, use) => {
        const dashboard = new LearnerDashboardPage(page, context);
        await use(dashboard);
    },
    // learnercourse: async ({ page, context }, use) => {
    //     const learnerCourse = new LearnerCoursePage(page, context);
    //     await use(learnerCourse);
    // },
    metadatalibrary: async ({ page, context }, use) => {
        const metadatalibrary = new MetaLibraryPage(page, context);
        await use(metadatalibrary);
    },
    adminGroup: async ({ page, context }, use) => {
        const adminGroup = new AdminGroupPage(page, context);
        await use(adminGroup);
    },
    organization: async ({ page, context }, use) => {
        const organization = new OrganizationPage(page, context);
        await use(organization);
    },
    commercehome: async ({ page, context }, use) => {
        const commercehome = new CommerceHomePage(page, context);
        await use(commercehome);
    },

    bannerHome: async ({ page, context }, use) => {
        const bannerHome = new BannerPage(page, context);
        await use(bannerHome);
    },
    dataBase: async ({ }, use) => {
        const dataBase = new DB();
        await use(dataBase);
    },

    costCenter: async ({ page, context }, use) => {
        const costcenter = new CostcenterPage(page, context);
        await use(costcenter);
    },


    announcementHome: async ({ page, context }, use) => {
        const announcementHome = new AnnouncementPage(page, context);
        await use(announcementHome);
    },
    contentHome: async ({ page, context }, use) => {
        const ContentHome = new ContentHomePage(page, context);
        await use(ContentHome);
    },

    profile: async ({ page, context }, use) => {
        const profile = new ProfilePage(page, context);
        await use(profile);
    },
    enrollHome: async ({ page, context }, use) => {
        const enrollHome = new EnrollmentPage(page, context);
        await use(enrollHome);
    },
    instructorHome: async ({ page, context }, use) => {
        const instructorHome = new InstructorPage(page, context);
        await use(instructorHome);
    },
    managerHome: async ({ page, context }, use) => {
        const managerHome = new ManagerPage(page, context);
        await use(managerHome);
    },
    readContentHome: async ({ page, context }, use) => {
        const  readContentHome  = new ReadContentPage(page, context);
        await use(readContentHome);
    },

    


})