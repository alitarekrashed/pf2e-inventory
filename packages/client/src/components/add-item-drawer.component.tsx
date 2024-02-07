import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"

type Anchor = "right"

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

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer(true)}>Add item</Button>
        <Drawer anchor={anchor} open={state} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250, p: 2 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          ></Box>
        </Drawer>
      </React.Fragment>
    </div>
  )
}
