import { Equipment } from "@pf2e-inventory/shared"
import axios from "axios"

export async function addItem(item: Equipment): Promise<void> {
  await axios.post("http://localhost:3000/inventory/item", item, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
}

export async function deleteItem(id: string): Promise<void> {
  await axios.delete(`http://localhost:3000/inventory/item/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
