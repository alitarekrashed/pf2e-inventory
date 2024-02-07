import axios from "axios"

export async function addItem(): Promise<void> {
  await axios.post(
    "http://localhost:3000/inventory/item",
    {
      name: "candle",
      level: 0,
      description: "A lit candle sheds dim light in a 10-foot radius for 8 hours.",
      price: [{ value: 1, type: "cp" }],
      hands: "1",
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    },
  )
}
