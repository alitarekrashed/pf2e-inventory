import { Grid } from "@mui/material"
import InventoryManager from "../components/inventory-manager.component"
import { useLoaderData } from "react-router-dom"
import { getInventories, getInventory } from "../services/inventory.service"
import { Inventory, PartyInventory } from "@pf2e-inventory/shared"

interface InventoryLoaderData {
  inventoryId: string
  isCharacter: boolean
  partyId: string
  linkedInventories: { id: string; name: string }[]
}

export async function loader({ params }: { params: any }): Promise<InventoryLoaderData> {
  const inventoryId = params.inventoryId
  const inventory = await getInventory(inventoryId)
  const isCharacter: boolean = inventory.type === "Character"
  const partyId = inventory.type === "Character" ? inventory.character.party_inventory_id : inventory.id
  const linkedInventories: { id: string; name: string }[] = []

  // TODO consider moving some of this to the backend, it's only ever called once here. we don't really need a 'get inventory' or 'get inventories' otherwise...

  if (isCharacter) {
    const party: PartyInventory = (await getInventory(partyId)) as PartyInventory
    const relatedInventories: Inventory[] = (await getInventories(party.party.inventory_ids)) as Inventory[]
    relatedInventories.forEach((val) => linkedInventories.push({ id: val.id, name: val.character.name }))
    linkedInventories.push({ id: party.id, name: party.party.name })
  } else {
    const relatedInventories: Inventory[] = (await getInventories(
      (inventory as PartyInventory).party.inventory_ids,
    )) as Inventory[]
    relatedInventories.forEach((val) => linkedInventories.push({ id: val.id, name: val.character.name }))
  }

  return { inventoryId, isCharacter, partyId, linkedInventories }
}

export default function InventoryRoute() {
  const data = useLoaderData() as InventoryLoaderData
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        {data.isCharacter && <InventoryManager id={data.partyId} linked={data.linkedInventories} />}
      </Grid>
      <Grid item xs={6}>
        <InventoryManager id={data.inventoryId} linked={data.linkedInventories} />
      </Grid>
    </Grid>
  )
}
