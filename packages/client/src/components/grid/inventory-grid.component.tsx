import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import PriceDisplay from "./cells/price-display.component"
import { Inventory } from "@pf2e-inventory/shared"
import { useEffect, useState } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import Paper from "@mui/material/Paper"

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
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Bulk</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory &&
              inventory.items.map((row) => (
                <TableRow key={`${row.id}`}>
                  <TableCell>{row.item.name}</TableCell>
                  <TableCell>{row.item.category}</TableCell>
                  <TableCell>{row.item.level}</TableCell>
                  <TableCell>{row.item.bulk}</TableCell>
                  <TableCell>
                    <PriceDisplay price={row.item.price} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
