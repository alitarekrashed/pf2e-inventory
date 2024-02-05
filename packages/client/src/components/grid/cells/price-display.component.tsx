import { Coinage } from "@pf2e-inventory/shared"
import React from "react"

export default function PriceDisplay({ price }: { price: Coinage[] }) {
  return (
    <>
      {price.map((coin: Coinage, index: number) => (
        <React.Fragment key={coin.type}>
          {coin.value} {coin.type}
          {index < price.length - 1 && ", "}
        </React.Fragment>
      ))}
    </>
  )
}
