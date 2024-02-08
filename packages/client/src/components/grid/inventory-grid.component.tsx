import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Inventory, PartyInventory } from "@pf2e-inventory/shared"
import Paper from "@mui/material/Paper"
import InventoryGridRow from "./inventory-grid-row.component"

export default function InventoryGrid({ inventory }: { inventory: Inventory | PartyInventory }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Bulk</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory && inventory.items.map((row) => <InventoryGridRow key={`${row.id}`} value={row} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
