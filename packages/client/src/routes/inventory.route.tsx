import { Grid } from "@mui/material"
import InventoryManager from "../components/inventory-manager.component"
import { useLoaderData } from "react-router-dom"
import { getInventory } from "../services/inventory.service"

export async function loader({ params }: { params: any }) {
  const inventory = await getInventory(params.inventoryId)

  const data = {
    inventoryId: params.inventoryId,
    partyId: inventory.type === "Character" ? inventory.character.party_inventory_id : undefined,
  }

  return data
}

export default function InventoryRoute() {
  const data = useLoaderData() as { inventoryId: string; partyId: string | undefined }
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {data.partyId && <InventoryManager id={data.partyId} />}
      </Grid>
      <Grid item xs={6}>
        <InventoryManager id={data.inventoryId} />
      </Grid>
    </Grid>
  )
}
