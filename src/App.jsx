import {
  AssignLead,
  CRManager,
  Dashboard,
  Leads,
  LeadsDetails,
  Login,
  SalesPerson,
} from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./pages/Layout/MainLayout";
import UserPersonDetails from "./components/custom/Users/UserPersonDetails";
import { Provider } from "react-redux";
import { store } from "./Store/store";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        path: "/app/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/app/sales-person",
        element: <SalesPerson />,
      },
      {
        path: "/app/userDetails",
        element: <UserPersonDetails />,
      },
      {
        path: "/app/cr-manager",
        element: <CRManager />,
      },
      {
        path: "/app/leads",
        element: <Leads />,
      },
      {
        path: "/app/assign-leads",
        element: <AssignLead />,
      },
      {
        path: "/app/leads-details/:leadId",
        element: <LeadsDetails />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
