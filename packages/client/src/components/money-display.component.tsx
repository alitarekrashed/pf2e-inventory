import { Box } from "@mui/material"
import { Money } from "@pf2e-inventory/shared"

export default function MoneyDisplay({ money }: { money: Money }) {
  return (
    <Box>
      {money.platinum} pp, {money.gold} gp, {money.silver} sp, {money.copper} cp
    </Box>
  )
}
