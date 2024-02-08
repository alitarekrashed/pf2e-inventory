import { createContext } from "react"

export const InventoryContext = createContext<{ id: string; related: string[] }>({
  id: "",
  related: [],
})
