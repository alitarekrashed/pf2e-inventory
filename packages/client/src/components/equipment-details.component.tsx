import { Box, Typography } from "@mui/material"
import { Equipment } from "@pf2e-inventory/shared"
import PriceDisplay from "./price-display.component"

export default function EquipmentDetails({ value }: { value: Equipment }) {
  return (
    <>
      <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
        <Box>
          Price <PriceDisplay price={value.price}></PriceDisplay>
        </Box>
        Bulk {value.bulk}; Hands {value.hands}
      </Typography>
    </>
  )
}
