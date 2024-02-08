import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app.tsx"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import InventoryRoute from "./routes/inventory.route.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/inventory/:inventoryId",
        element: <InventoryRoute />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
