import { TableCell, TableRow } from "@mui/material"
import { CharacterItem } from "@pf2e-inventory/shared"
import PriceDisplay from "./cells/price-display.component"

export default function InventoryGridRow({ value }: { value: CharacterItem }) {
  return (
    <TableRow>
      <TableCell>{value.item.name}</TableCell>
      <TableCell>{value.item.category}</TableCell>
      <TableCell>{value.item.level}</TableCell>
      <TableCell>{value.item.bulk}</TableCell>
      <TableCell>
        <PriceDisplay price={value.item.price} />
      </TableCell>
    </TableRow>
  )
}
