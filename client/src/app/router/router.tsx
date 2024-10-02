import { ROUTES } from "./routes";
import Layout from "./Layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import { SignInPage } from "@/pages/SignInPage";
import { SignUpPage } from "@/pages/SignUpPage";

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Layout/>,
        children: [
            // {
            //     path: ROUTES.HOME,
            //     element: <MainPage/>
            // },
            {
                path: ROUTES.SIGNIN,
                element: <SignInPage/>
            },
            {
                path: ROUTES.SIGNUP,
                element: <SignUpPage/>
            }
        ]
    }
])