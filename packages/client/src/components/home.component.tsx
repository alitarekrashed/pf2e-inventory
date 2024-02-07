import { Button } from "@mui/joy"
import Inventory from "./grid/inventory.component"
import { addItem } from "../services/inventory.service"

export default function Home() {
  return (
    <>
      <Button onClick={() => addItem()}>Add</Button>
      <Inventory />
    </>
  )
}
