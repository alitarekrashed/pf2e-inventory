import { Button } from "@mui/joy"
import Inventory from "./grid/inventory.component"
import { addItem } from "../services/inventory.service"
import AddItemModal from "./add-item-modal.component"

export default function Home() {
  return (
    <>
      <Button onClick={() => addItem()}>Add</Button>
      <AddItemModal />
      <Inventory />
    </>
  )
}
