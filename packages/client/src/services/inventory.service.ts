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
