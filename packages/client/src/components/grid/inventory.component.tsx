import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import PriceDisplay from "./cells/price-display.component"
import { Equipment } from "@pf2e-inventory/shared"
import { useEffect, useState } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import Paper from "@mui/material/Paper"

const WS_URL = "ws://localhost:3000/ws/inventory"

export default function Inventory() {
  const [inventory, setInventory] = useState<Equipment[]>([])
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
      setInventory(lastJsonMessage as Equipment[])
    }
  }, [lastJsonMessage])

  return (
    <>
      <Container>
        <TableContainer component={Paper}>
          <Typography sx={{ flex: "1 1 100%", px: "8px", pt: "8px" }} variant="h6" id="tableTitle" component="div">
            Inventory
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Bulk</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((row, idx) => (
                <TableRow key={`${row.name}-${idx}`}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.level}</TableCell>
                  <TableCell>{row.bulk}</TableCell>
                  <TableCell>
                    <PriceDisplay price={row.price} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}
