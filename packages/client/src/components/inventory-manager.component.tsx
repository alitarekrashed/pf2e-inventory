import { Inventory } from "@pf2e-inventory/shared"
import AddItemDrawer from "./drawer/add-item-drawer.component"
import InventoryGrid from "./grid/inventory-grid.component"
import { useEffect, useState } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"

const WS_URL = "ws://localhost:3000/ws/inventory"

export default function InventoryManager() {
  const [inventory, setInventory] = useState<Inventory>()

  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(WS_URL + "/1", {
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
    inventory && (
      <>
        <AddItemDrawer />
        <InventoryGrid inventory={inventory} />
      </>
    )
  )
}
