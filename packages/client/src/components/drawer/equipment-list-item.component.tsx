import { Box, Collapse, Divider, IconButton, ListItem, ListItemText } from "@mui/material"
import { Equipment } from "@pf2e-inventory/shared"
import { FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa"
import { addItem } from "../../services/inventory.service"
import { useContext, useState } from "react"
import EquipmentDetails from "../equipment-details.component"
import { InventoryContext } from "../../lib/inventory.context"

export default function EquipmentListItem({ value }: { value: Equipment }) {
  const [open, setOpen] = useState<boolean>(false)
  const inventoryId: string = useContext(InventoryContext)

  return (
    <>
      <ListItem
        sx={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
        secondaryAction={
          <IconButton
            aria-label="add"
            onClick={($event) => {
              $event.stopPropagation()
              addItem(inventoryId, value)
            }}
          >
            <FaPlus size={12} />
          </IconButton>
        }
      >
        <ListItemText
          primary={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {open ? <FaChevronUp /> : <FaChevronDown />} {value.name}
            </Box>
          }
        />
      </ListItem>
      <Collapse in={open} unmountOnExit>
        <EquipmentDetails value={value} />
        {value.description}
      </Collapse>
      <Divider />
    </>
  )
}
