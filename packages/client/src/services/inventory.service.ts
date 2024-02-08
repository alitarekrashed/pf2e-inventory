import { Equipment, Inventory, MoveItemRequest, PartyInventory } from "@pf2e-inventory/shared"
import axios from "axios"

export async function getInventory(id: string): Promise<Inventory | PartyInventory> {
  return (
    await axios.get<Inventory | PartyInventory>(`http://localhost:3000/inventory/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
  ).data
}

export async function addItem(id: string, item: Equipment): Promise<void> {
  await axios.post(`http://localhost:3000/inventory/${id}/item`, item, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
}

export async function deleteItem(inventoryId: string, itemId: string): Promise<void> {
  await axios.delete(`http://localhost:3000/inventory/${inventoryId}/item/${itemId}`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
}

export async function moveItem(inventoryId: string, itemId: string, targetId: string): Promise<void> {
  await axios.post<MoveItemRequest>(
    `http://localhost:3000/inventory/${inventoryId}/item/${itemId}/move`,
    { target: targetId },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    },
  )
}
