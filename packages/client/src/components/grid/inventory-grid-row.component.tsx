import { Collapse, IconButton, TableCell, TableRow } from "@mui/material"
import { CharacterItem } from "@pf2e-inventory/shared"
import PriceDisplay from "./cells/price-display.component"
import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

export default function InventoryGridRow({ value }: { value: CharacterItem }) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell>{value.item.name}</TableCell>
        <TableCell>{value.item.category}</TableCell>
        <TableCell>{value.item.level}</TableCell>
        <TableCell>{value.item.bulk}</TableCell>
        <TableCell>
          <PriceDisplay price={value.item.price} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} unmountOnExit>
            {value.item.description}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
