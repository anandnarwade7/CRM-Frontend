import { CRManager, Dashboard, Leads, Login, SalesPerson } from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./pages/Layout/MainLayout";
import UserPersonDetails from "./components/custom/Users/UserPersonDetails";

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
    ],
  },
]);
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
