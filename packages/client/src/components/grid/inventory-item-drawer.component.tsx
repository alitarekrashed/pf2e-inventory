import { Button, Card, CardContent, CardHeader, IconButton, Paper, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import { CharacterItem } from "@pf2e-inventory/shared"
import React from "react"
import { deleteItem } from "../../services/inventory.service"
import { FaTrash } from "react-icons/fa"

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

  return (
    <React.Fragment>
      <Drawer anchor={anchor} open={isOpen} onClose={onClose}>
        <Box sx={{ width: 350, height: "100%", display: "flex", flexDirection: "column" }} role="presentation">
          <Box sx={{ flex: "1 1 auto", p: 2 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {value.item.name}
                </Typography>
                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                  Level: {value.item.level}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>{value.item.description}</Typography>
              </CardContent>
            </Card>
          </Box>
          <Paper elevation={3} sx={{ position: "absolute", bottom: 0, width: "100%" }}>
            <Button
              sx={{ width: "min-content", pb: "10" }}
              onClick={() => {
                deleteItem(value.id)
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
