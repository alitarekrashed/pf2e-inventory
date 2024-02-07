import { Box, Collapse, Divider, IconButton, ListItem, ListItemText } from "@mui/material"
import { Equipment } from "@pf2e-inventory/shared"
import { FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa"
import { addItem } from "../../services/inventory.service"
import { useState } from "react"

export default function EquipmentListItem({ value }: { value: Equipment }) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <ListItem
        sx={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
        secondaryAction={
          <IconButton aria-label="add" onClick={() => addItem(value)}>
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
      <Collapse in={open}>{value.description}</Collapse>
      <Divider />
    </>
  )
}
