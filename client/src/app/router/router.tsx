import { ROUTES } from "./routes";
import { AppLayout } from "./Layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import { SignInPage } from "@/pages/SignInPage";
import { SignUpPage } from "@/pages/SignUpPage";
import MainPage from "@/pages/MainPage/MainPage";
import { ConstructorPage } from "@/pages/Constructor";
import { LogoutPage } from "@/pages/LogoutPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { WorkSpacePage } from "@/pages/WorkSpace";
import { ResetPasswordPage } from "@/pages/resetPasswordPage";
import { ErrorPage } from "@/pages/ErrorPage";
import { LyricFilesPage } from "@/pages/LyricFilesPage";
import { LyricFilePage } from "@/pages/LyricFilePage";
import { AdminPage } from "@/pages/Admin";
import { FavoritesPage } from "@/pages/FavoritesPage";
// import ProtectedRouter from "@/shared/utils/ProtectedRouter/ProtectedRouter";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <MainPage />,
      },
      {
        path: ROUTES.SIGNIN,
        element: <SignInPage />,
      },
      {
        path: ROUTES.SIGNUP,
        element: <SignUpPage />,
      },
      {
        path: ROUTES.CONSTRUCTOR,
        element: <ConstructorPage />,
      },
      {
        path: ROUTES.WORKSPACE,
        element: <WorkSpacePage />,
      },
      {
        path: ROUTES.LOGOUT,
        element: <LogoutPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.RESET,
        element: <ResetPasswordPage />,
      },
      {
        path: ROUTES.LYRIC_FILES,
        element: <LyricFilesPage />,
      },
      {
        path: ROUTES.LYRIC_FILE_CARD,
        element: (
          // <ProtectedRouter>
            <LyricFilePage />
          // </ProtectedRouter>
        ),
      },
      {
        path: ROUTES.ADMIN,
        element: <AdminPage />,
      },
      {
        path: ROUTES.FAVORITES,
        element: <FavoritesPage />,
      },
      {
        path: ROUTES.ERROR,
        element: <ErrorPage />,
      },
    ],
  },
]);
