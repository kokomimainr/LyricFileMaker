import { ROUTES } from "./routes";
import { AppLayout } from "./Layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import { SignInPage } from "@/pages/SignInPage";
import { SignUpPage } from "@/pages/SignUpPage"
import MainPage from "@/pages/MainPage/MainPage";
import { ConstructorPage } from "@/pages/Constructor";
import { LogoutPage } from "@/pages/LogoutPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { WorkSpacePage } from "@/pages/WorkSpace";
import { ResetPasswordPage } from "@/pages/resetPasswordPage";



export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <AppLayout/>,
        children: [
            {
                path: ROUTES.HOME,
                element: <MainPage/>
            },
            {
                path: ROUTES.SIGNIN,
                element: <SignInPage/>
            },
            {
                path: ROUTES.SIGNUP,
                element: <SignUpPage/>
            },
            {
                path: ROUTES.CONSTRUCTOR,
                element: <ConstructorPage/>
            },
            {
                path: ROUTES.WORKSPACE,
                element: <WorkSpacePage/>
            },
            {
                path: ROUTES.LOGOUT,
                element: <LogoutPage/>
            },
            {
                path: ROUTES.PROFILE,
                element: <ProfilePage/>
            },
            {
             path: ROUTES.RESET,
             element: <ResetPasswordPage/>
            }

        ]
    }
])