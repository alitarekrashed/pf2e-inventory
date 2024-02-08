import { Inventory, PartyInventory } from "@pf2e-inventory/shared"
import AddItemDrawer from "./drawer/add-item-drawer.component"
import InventoryGrid from "./grid/inventory-grid.component"
import { useEffect, useState } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { InventoryContext } from "../lib/inventory.context"
import { Box, Typography } from "@mui/material"
import MoneyDisplay from "./money-display.component"

const WS_URL = "ws://localhost:3000/ws/inventory"

export default function InventoryManager({ id }: { id: string }) {
  const [inventory, setInventory] = useState<Inventory | PartyInventory>()

  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(WS_URL + `/${id}`, {
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

  const getName = () => {
    if (inventory?.type === "Character") {
      return inventory.character.name
    } else {
      return inventory?.party.name
    }
  }

  const getRelatedIds = () => {
    if (inventory?.type === "Character") {
      return [inventory.character.party_inventory_id]
    } else if (inventory) {
      return inventory?.party.inventory_ids
    }
    return []
  }

  return (
    // TODO create a InventoryProvider here that allows me to retrieve the inventory easily, that way i dont have to prop drill
    inventory && (
      <>
        <InventoryContext.Provider value={{ id: id, related: getRelatedIds() }}>
          <Box sx={{ display: "flex", px: "8px", pt: "8px", alignItems: "center", textAlign: "center" }}>
            <MoneyDisplay money={inventory.money} />
            <Typography variant="h6" sx={{ flex: "1 1 auto" }}>
              {getName()}
            </Typography>
            <AddItemDrawer />
          </Box>
          <InventoryGrid inventory={inventory} />
        </InventoryContext.Provider>
      </>
    )
  )
}
