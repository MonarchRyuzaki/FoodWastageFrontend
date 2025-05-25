import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPageDonor from "./pages/RegisterPageDonor";
import RegisterPageNGO from "./pages/RegisterPageNGO";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login", // use URL params for Donor and NGO login
        element: <LoginPage />,
      },
      {
        path: "register/donor",
        element: <RegisterPageDonor />,
      },
      {
        path: "register/ngo", // use URL params for Donor and NGO register
        element: <RegisterPageNGO />,
      },
      {
        path: "donations", // Here all the donation listing will be shown along with the filter options. The filter slected will be saved in the URL params
      },
      {
        path: "donation/:id", // Here the donation details will be shown
      },
      {
        path: "donation/:id/edit", // Here will be the edit donation form. The form will be prefilled with the donation details. It will be accessible to onlt the creator of the donation. Same for delete
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
