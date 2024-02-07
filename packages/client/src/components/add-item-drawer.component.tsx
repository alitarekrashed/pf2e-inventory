import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import { addItem } from "../services/inventory.service"
import { Button } from "@mui/material"
import { Equipment } from "@pf2e-inventory/shared"

type Anchor = "right"

const CANDLE: Equipment = {
  name: "candle",
  level: 0,
  description: "A lit candle sheds dim light in a 10-foot radius for 8 hours.",
  price: [{ value: 1, type: "cp" }],
  hands: "1",
}

const RING: Equipment = {
  name: "traitor's ring",
  level: 0,
  description:
    "This ring has a thick band supporting a square-cut gem that can be customized to the buyer's preference. The thickness of the band allows it to be taken to any jeweler or blacksmith to be adjusted to different hands or fingers from the original make. There is a tiny clasp at the side of the gem that, when pressed, opens the gem, revealing a small, hinged compartment. This compartment is designed to hold one dose of poison, allowing wearers to slip the contents of the ring into the food or drink of an intended target. The compartment can be closed again by gently pressing the gem back into place. Noticing the compartment requires a DC 15 Perception check for anyone inspecting the ring.",
  access: "Member of a secret society",
  usage: "worn",
  price: [
    {
      value: 1,
      type: "gp",
    },
    {
      value: 5,
      type: "sp",
    },
  ],
  rarity: "uncommon",
}

/**
 * TODO
 * 1. get items from backend and display them
 * 2. items have an 'add' button
 * 3. items can be expanded to see more details
 * 4. items should have db ids that are used as keys
 * 5. things are extracted to components as necessary
 */

export default function AddItemDrawer() {
  const [state, setState] = React.useState(false)
  const anchor: Anchor = "right"

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return
    }

    setState(open)
  }

  const add = (val: Equipment) => {
    addItem(val)
  }

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>Add item</Button>
        <Drawer anchor={anchor} open={state} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250, p: 2 }} role="presentation">
            <Button onClick={() => add(CANDLE)}>Add a candle</Button>
            <Button onClick={() => add(RING)}>Add a ring</Button>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  )
}
