import Button from "@mui/joy/Button"
import Modal from "@mui/joy/Modal"
import ModalDialog from "@mui/joy/ModalDialog"
import DialogTitle from "@mui/joy/DialogTitle"
import Stack from "@mui/joy/Stack"
import { FaPlus } from "react-icons/fa"
import { useEffect, useState } from "react"
import { Equipment } from "@pf2e-inventory/shared"
import React from "react"
import { getItems } from "../services/items.service"
import { addItem } from "../services/inventory.service"

export default function AddItemModal() {
  const [open, setOpen] = useState<boolean>(false)
  const [items, setItems] = useState<Equipment[]>([])

  useEffect(() => {
    getItems().then((val) => setItems(val))
  }, [])

  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" startDecorator={<FaPlus />} onClick={() => setOpen(true)}>
        Add
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Add an item to your inventory</DialogTitle>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault()
              addItem({
                name: "candle",
                level: 0,
                description: "A lit candle sheds dim light in a 10-foot radius for 8 hours.",
                price: [{ value: 1, type: "cp" }],
                hands: "1",
              })
              setOpen(false)
            }}
          >
            <Stack spacing={2}>
              {items.map((val) => (
                <p key={val.name}>{val.name}</p>
              ))}
              <Button type="submit">Add</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  )
}
