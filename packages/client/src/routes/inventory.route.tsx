import { Grid } from "@mui/material"
import InventoryManager from "../components/inventory-manager.component"

export default function InventoryRoute() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <InventoryManager id={"2"} />
      </Grid>
      <Grid item xs={6}>
        <InventoryManager id={"1"} />
      </Grid>
    </Grid>
  )
}
