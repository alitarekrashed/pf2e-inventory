import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import { CharacterItem } from "@pf2e-inventory/shared"
import React, { useContext, useRef, useState } from "react"
import { deleteItem, moveItem } from "../../services/inventory.service"
import EquipmentDetails from "../equipment-details.component"
import { InventoryContext } from "../../lib/inventory.context"
import { FaArrowDown, FaChevronDown } from "react-icons/fa"

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
              <MoveItemButtonGroup itemId={value.id} />
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

function MoveItemButtonGroup({ itemId }: { itemId: string }) {
  const inventoryContext = useContext(InventoryContext)
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  const options = inventoryContext.related.filter((val) => val.id !== inventoryContext.id)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClick = (event: any, index: number) => {
    moveItem(inventoryContext.id, itemId, options[index].id)
    setOpen(false)
  }

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <ButtonGroup ref={anchorRef} variant="contained">
        <Button size="small" onClick={handleToggle}>
          <Box component={"span"} marginRight={1}>
            Move
          </Box>
          <FaChevronDown />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem key={option.id} onClick={(event) => handleClick(event, index)}>
                      {option.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
