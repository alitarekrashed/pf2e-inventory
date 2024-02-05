import React from "react";
import { Coinage } from "../../../models/Coinage";

export default function PriceDisplay({ price }: { price: Coinage[] }) {
  console.log(price);
  return (
    <>
      {price.map((coin: Coinage, index: number) => (
        <React.Fragment key={coin.type}>
          {coin.value} {coin.type}
          {index < price.length - 1 && ", "}
        </React.Fragment>
      ))}
    </>
  );
}
