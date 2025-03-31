import {
  AddClient,
  Admin,
  AdminDetails,
  AssignClientLead,
  AssignLead,
  Client,
  ClientsDetails,
  ClientsList,
  CRManager,
  CRMClientDetails,
  Dashboard,
  InventoryDetails,
  Leads,
  LeadsDetails,
  Login,
  Projects,
  SalesLeadsDetails,
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
import ProtectedRoute from "./ProtectedRoute";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/app",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/app",
        element: <MainLayout />,
        children: [
          {
            path: "/app/dashboard",
            element: <Dashboard />,
          },
          // Screens for super admin
          {
            path: "/app/admin",
            element: <Admin />,
          },
          {
            path: "/app/admin-details",
            element: <AdminDetails />,
          },
          {
            path: "/app/admin-details/:id",
            element: <AdminDetails />,
          },
          // screen for sales person
          {
            path: "/app/sales-person",
            element: <SalesPerson />,
          },
          // Viewing the sales and cr Managers details
          {
            path: "/app/userDetails",
            element: <UserPersonDetails />,
          },
          // screen for CR Manager
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
          {
            path: "/app/leads-details-sales/:leadId",
            element: <SalesLeadsDetails />,
          },
          {
            path: "/app/client",
            element: <Client />,
          },
          {
            path: "/app/client-leads",
            element: <AssignClientLead />,
          },
          {
            path: "/app/client-details/:clientId",
            element: <ClientsDetails />,
          },
          {
            path: "/app/client-details-crm/:clientId",
            element: <CRMClientDetails />,
          },
          {
            path: "/app/add-client/:id",
            element: <AddClient />,
          },
          {
            path: "/app/clients-list",
            element: <ClientsList />,
          },
          {
            path: "/app/projects",
            element: <Projects />,
          },
          {
            path: "/app/inventory-details",
            element: <InventoryDetails />,
          },
        ],
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
