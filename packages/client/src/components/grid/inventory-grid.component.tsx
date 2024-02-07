import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Inventory } from "@pf2e-inventory/shared"
import { useEffect, useState } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import Paper from "@mui/material/Paper"
import InventoryGridRow from "./inventory-grid-row.component"

const WS_URL = "ws://localhost:3000/ws/inventory"

export default function InventoryGrid() {
  const [inventory, setInventory] = useState<Inventory>()
  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
  })

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      // tell the websocket to send us the current inventory
      sendJsonMessage({ command: "GET_INVENTORY" })
    }
  }, [readyState])

  useEffect(() => {
    if (lastJsonMessage) {
      setInventory(lastJsonMessage as Inventory)
    }
  }, [lastJsonMessage])

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
