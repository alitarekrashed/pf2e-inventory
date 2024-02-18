import { createContext } from "react"

export const InventoryContext = createContext<{ id: string; related: { id: string; name: string }[] }>({
  id: "",
  related: [],
})
