import { TableCell, TableRow } from "@mui/material"
import { CharacterItem } from "@pf2e-inventory/shared"
import PriceDisplay from "./cells/price-display.component"
import InventoryItemDrawer from "./inventory-item-drawer.component"
import { useState } from "react"

export default function InventoryGridRow({ value }: { value: CharacterItem }) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  return (
    <>
      <TableRow onClick={() => setDrawerOpen(true)}>
        <TableCell></TableCell>
        <TableCell>{value.item.name}</TableCell>
        <TableCell>{value.item.category}</TableCell>
        <TableCell>{value.item.level}</TableCell>
        <TableCell>{value.item.bulk}</TableCell>
        <TableCell>
          <PriceDisplay price={value.item.price} />
        </TableCell>
      </TableRow>
      <InventoryItemDrawer value={value} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
