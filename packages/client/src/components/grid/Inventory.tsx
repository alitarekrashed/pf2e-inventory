import { Sheet, Table } from "@mui/joy"
import PriceDisplay from "./cells/PriceDisplay"
import { Equipment } from "@pf2e-inventory/shared"
import React from "react"

const CANDLE: Equipment = {
  name: "candle",
  level: 0,
  description: "A lit candle sheds dim light in a 10-foot radius for 8 hours.",
  price: [{ value: 1, type: "cp" }],
  hands: "1",
}

const TRAITORS_RING: Equipment = {
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

const rows: Equipment[] = [CANDLE, TRAITORS_RING]

export default function Inventory() {
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
            {rows.map((row) => (
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
