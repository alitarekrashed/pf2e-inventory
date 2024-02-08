import { Button, Card, CardContent, CardHeader, Paper, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import { CharacterItem } from "@pf2e-inventory/shared"
import React, { useContext } from "react"
import { deleteItem, moveItem } from "../../services/inventory.service"
import EquipmentDetails from "../equipment-details.component"
import { InventoryContext } from "../../lib/inventory.context"

type Anchor = "right"

export default function InventoryItemDrawer({
  value,
  isOpen,
  onClose,
}: {
  value: CharacterItem
  isOpen: boolean
  onClose: () => void
}) {
  const anchor: Anchor = "right"
  const inventoryContext = useContext(InventoryContext)

  return (
    <React.Fragment>
      <Drawer anchor={anchor} open={isOpen} onClose={onClose}>
        <Box sx={{ width: 350, height: "100%", display: "flex", flexDirection: "column" }} role="presentation">
          <Box sx={{ flex: "1 1 auto", p: 2 }}>
            <Card>
              <CardHeader
                title={value.item.name}
                subheader={
                  <>
                    {value.item.category} {value.item.level}
                  </>
                }
                sx={{ paddingBottom: 0 }}
              />
              <CardContent>
                <EquipmentDetails value={value.item} />
                <Typography sx={{ fontSize: 14 }}>{value.item.description}</Typography>
              </CardContent>
            </Card>
            <Box>
              <Button onClick={() => moveItem(inventoryContext.id, value.id, inventoryContext.related[0])}>Move</Button>
            </Box>
          </Box>
          <Paper elevation={3} sx={{ position: "absolute", bottom: 0, width: "100%" }}>
            <Button
              sx={{ width: "min-content", pb: "10" }}
              onClick={() => {
                deleteItem(inventoryContext.id, value.id)
                onClose()
              }}
            >
              Remove
            </Button>
          </Paper>
        </Box>
      </Drawer>
    </React.Fragment>
  )
}
