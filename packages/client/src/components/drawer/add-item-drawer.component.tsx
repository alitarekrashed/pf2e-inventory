import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import { addItem } from "../../services/inventory.service"
import { Button, IconButton, List, ListItem, ListItemText } from "@mui/material"
import { Equipment } from "@pf2e-inventory/shared"
import { useEffect, useState } from "react"
import { getItems } from "../../services/items.service"
import React from "react"
import { FaPlus } from "react-icons/fa"
import EquipmentListItem from "./equipment-list-item.component"

type Anchor = "right"

/**
 * TODO
 * 3. items can be expanded to see more details
 * 4. items should have db ids that are used as keys
 * 5. things are extracted to components as necessary
 */

export default function AddItemDrawer() {
  const [state, setState] = useState<boolean>(false)
  const [items, setItems] = useState<Equipment[]>([])
  const anchor: Anchor = "right"

  useEffect(() => {
    getItems().then((val) => setItems(val))
  }, [])

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return
    }

    setState(open)
  }

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>Add item</Button>
        <Drawer anchor={anchor} open={state} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250, p: 2 }} role="presentation">
            <List dense={true}>
              {items.map((item) => (
                <EquipmentListItem key={item.name} value={item} />
              ))}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  )
}
