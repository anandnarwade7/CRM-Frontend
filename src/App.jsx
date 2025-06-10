import {
  AddClient,
  Admin,
  AdminDetails,
  AssignClientLead,
  AssignLead,
  BookedFlats,
  Client,
  ClientActivities,
  ClientsDetails,
  ClientShowEventDetails,
  ClientsList,
  CreateInventoryDetails,
  CRManager,
  CRMClientDetails,
  Dashboard,
  InventoryDetails,
  Leads,
  LeadsDetails,
  Login,
  NotFound,
  Projects,
  SalesLeadsDetails,
  SalesPerson,
  Support,
  UpdateSqFt,
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
          // Routes for Leads
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
          // Routes for Clients
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
          // Routes for Client Activities
          {
            path: "/app/activities",
            element: <ClientActivities />,
          },
          {
            path: "/app/clients-list",
            element: <ClientsList />,
          },
          {
            path: `/app/show-eventdetails/:leadId`,
            element: <ClientShowEventDetails />,
          },
          // Project Section
          {
            path: "/app/projects",
            element: <Projects />,
          },
          {
            path: "/app/create-inventory",
            element: <CreateInventoryDetails />,
          },
          {
            path: "/app/inventory-details/:projectId",
            element: <InventoryDetails />,
          },
          {
            path: "/app/update-sqft",
            element: <UpdateSqFt />,
          },
          // Support
          {
            path: "/app/support",
            element: <Support />,
          },
          // Booked Flats
          {
            path: "/app/bookedflats",
            element: <BookedFlats />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
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
