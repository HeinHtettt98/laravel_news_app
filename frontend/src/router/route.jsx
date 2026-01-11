import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import App from "../App";
import CreateNewsPage from "../Page/CreateNewsPage";
import NewsDetailPage from "../Page/NewsDetailPage";
import HomePage from "../Page/HomePage";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import UserEditProfilePage from "../Page/UserEditProfilePage";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import UserManagePostPage from "../Page/UserManagePostPage";
import FourOFour from "./FourOFour";

const route = () => {
  const { name, photo } = useSelector((state) => state.user);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "create-post",
          element: name == "" ? <Navigate to={"/"} /> : <CreateNewsPage />,
        },
        {
          path: "news/:id",
          element: <NewsDetailPage />,
        },
        {
          path: "register",
          element: name == "" ? <RegisterForm /> : <Navigate to={"/"} />,
        },
        {
          path: "login",
          element: name == "" ? <LoginForm /> : <Navigate to={"/"} />,
        },
        {
          path: "user/edit-profile",
          element: name == "" ? <Navigate to={"/"} /> : <UserEditProfilePage />,
        },
        {
          path: "user/manage-posts",
          element: name == "" ? <Navigate to={"/"} /> : <UserManagePostPage />,
        },
      ],
    },
    {
      path: "/*",
      element: <FourOFour />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default route;
