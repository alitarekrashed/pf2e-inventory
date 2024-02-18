import React from "react"
import ReactDOM from "react-dom/client"
import Root from "./routes/root.route.tsx"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import InventoryRoute, { loader as inventoryLoader } from "./routes/inventory.route.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/inventory/:inventoryId",
        element: <InventoryRoute />,
        loader: inventoryLoader,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
