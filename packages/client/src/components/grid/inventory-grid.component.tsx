import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Inventory } from "@pf2e-inventory/shared"
import Paper from "@mui/material/Paper"
import InventoryGridRow from "./inventory-grid-row.component"

export default function InventoryGrid({ inventory }: { inventory: Inventory }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Typography
          sx={{ flex: "1 1 100%", px: "8px", pt: "8px", textAlign: "center" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Inventory
        </Typography>
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
