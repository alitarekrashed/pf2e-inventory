import { Equipment } from "@pf2e-inventory/shared"
import axios, { AxiosResponse } from "axios"

export async function getEquipment(): Promise<Equipment[]> {
  const response: AxiosResponse<Equipment[]> = await axios.get("http://localhost:3000/equipment")
  return response.data
}
