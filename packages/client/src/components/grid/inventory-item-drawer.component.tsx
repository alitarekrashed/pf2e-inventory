import { Button, IconButton } from "@mui/material"
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
        <Box sx={{ width: 350, height: "100%", p: 2, display: "flex", flexDirection: "column" }} role="presentation">
          <Box sx={{ flex: "1 1 auto" }}>{value.item.description}</Box>
          <Button
            sx={{ width: "min-content", flex: "0 0 auto" }}
            onClick={() => {
              deleteItem(value.id)
              onClose()
            }}
          >
            Remove
          </Button>
        </Box>
      </Drawer>
    </React.Fragment>
  )
}
