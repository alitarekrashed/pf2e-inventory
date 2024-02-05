import { Sheet, Table } from "@mui/joy"
import PriceDisplay from "./cells/price-display.component"
import { Equipment } from "@pf2e-inventory/shared"
import { useEffect, useState } from "react"
import { getInventory } from "../../services/inventory.service"

export default function Inventory() {
  const [inventory, setInventory] = useState<Equipment[]>([])

  useEffect(() => {
    getInventory().then((value) => {
      setInventory(value)
    })
  }, [])

  return (
    <>
      <Sheet>
        <Table variant="outlined">
          <caption>Inventory</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ width: "64px" }}>Level</th>
              <th style={{ width: "64px" }}>Bulk</th>
              <th style={{ width: "64px" }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.level}</td>
                <td>{row.bulk}</td>
                <td>
                  <PriceDisplay price={row.price} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  )
}
