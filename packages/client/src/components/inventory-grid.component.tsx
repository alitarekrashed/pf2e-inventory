import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, ClickAwayListener, Drawer, Grow, MenuItem, MenuList, Popper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { Inventory, PartyInventory } from "@pf2e-inventory/shared"
import Paper from "@mui/material/Paper"
import { CharacterItem } from "@pf2e-inventory/shared"
import PriceDisplay from "./price-display.component"
import { useContext, useRef, useState } from "react"
import React from "react"
import { FaChevronDown } from "react-icons/fa"
import { InventoryContext } from "../lib/inventory.context"
import { deleteItem, moveItem } from "../services/inventory.service"
import EquipmentDetails from "./equipment-details.component"

export default function InventoryGrid({ inventory }: { inventory: Inventory | PartyInventory }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Bulk</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory && inventory.items.map((row) => <InventoryGridRow key={`${row.id}`} value={row} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

function InventoryGridRow({ value }: { value: CharacterItem }) {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  return (
    <>
      <TableRow onClick={() => setDrawerOpen(true)}>
        <TableCell></TableCell>
        <TableCell>{value.item.name}</TableCell>
        <TableCell>{value.item.category}</TableCell>
        <TableCell>{value.item.level}</TableCell>
        <TableCell>{value.item.bulk}</TableCell>
        <TableCell>
          <PriceDisplay price={value.item.price} />
        </TableCell>
      </TableRow>
      <InventoryItemDrawer value={value} isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

type Anchor = "right"

function InventoryItemDrawer({
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
            <Box width="100%" textAlign="center" marginTop={4}>
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

  const handleClick = (index: number) => {
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
            Send to
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
                    <MenuItem key={option.id} onClick={() => handleClick(index)}>
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
