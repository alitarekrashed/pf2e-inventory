import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import { CharacterItem } from "@pf2e-inventory/shared"
import React from "react"

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
        <Box sx={{ width: 350, p: 2 }} role="presentation">
          {value.item.description}
        </Box>
      </Drawer>
    </React.Fragment>
  )
}
