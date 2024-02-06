import { Button, Sheet, Table } from "@mui/joy"
import PriceDisplay from "./cells/price-display.component"
import { Equipment } from "@pf2e-inventory/shared"
import { useEffect, useState } from "react"
import { addItem } from "../../services/inventory.service"
import useWebSocket, { ReadyState } from "react-use-websocket"

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
      <Sheet>
        <Button onClick={() => addItem()}>Add</Button>
        <Table variant="outlined">
          <caption>Inventory</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ width: "64px" }}>Level</th>
              <th style={{ width: "64px" }}>Bulk</th>
              <th style={{ width: "64px" }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((row, idx) => (
              <tr key={`${row.name}-${idx}`}>
                <td>{row.name}</td>
                <td>{row.level}</td>
                <td>{row.bulk}</td>
                <td>
                  <PriceDisplay price={row.price} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  )
}
