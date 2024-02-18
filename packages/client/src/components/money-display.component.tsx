import { Box } from "@mui/material"
import { Currencies, Money } from "@pf2e-inventory/shared"

export default function MoneyDisplay({ money }: { money: Money }) {
  return (
    <Box display="flex" border={1} px={1} borderRadius={1} borderColor="secondary.main" gap={1}>
      {["platinum", "gold", "silver", "copper"].map((value) => (
        <CoinDisplay key={value} money={money} type={value as Currencies} />
      ))}
    </Box>
  )
}

function CoinDisplay({ money, type }: { money: Money; type: Currencies }) {
  return (
    <Box display="flex" alignItems="center">
      <Box component="span" marginRight="2px">
        {money[type]}
      </Box>
      <Image type={type} />
    </Box>
  )
}

function Image({ type }: { type: string }) {
  return <img src={`/${type}-coin.png`} width="14" height="14" alt={type} />
}
