import { Equipment } from "@pf2e-inventory/shared"
import axios, { AxiosResponse } from "axios"

export async function getInventory(): Promise<Equipment[]> {
  const response: AxiosResponse<Equipment[]> = await axios.get("http://localhost:3000/inventory")
  return response.data
}
