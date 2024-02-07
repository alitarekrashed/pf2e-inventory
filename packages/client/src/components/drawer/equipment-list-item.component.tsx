import { IconButton, ListItem, ListItemText } from "@mui/material"
import { Equipment } from "@pf2e-inventory/shared"
import { FaPlus } from "react-icons/fa"
import { addItem } from "../../services/inventory.service"

export default function EquipmentListItem({ value }: { value: Equipment }) {
  return (
    <ListItem
      divider={true}
      secondaryAction={
        <IconButton aria-label="Add" onClick={() => addItem(value)}>
          <FaPlus size={12} />
        </IconButton>
      }
    >
      <ListItemText primary={value.name} />
    </ListItem>
  )
}
