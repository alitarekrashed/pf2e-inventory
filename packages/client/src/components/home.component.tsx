import { Button } from "@mui/joy"
import Inventory from "./grid/inventory.component"
import AddItemModal from "./add-item-modal.component"

export default function Home() {
  return (
    <>
      <AddItemModal />
      <Inventory />
    </>
  )
}
