import { Box, IconButton } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import React from "react"
import { FaSun } from "react-icons/fa"
import { FaMoon } from "react-icons/fa"

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

export default function DarkModeToggle() {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? <FaSun /> : <FaMoon />}
      </IconButton>
    </Box>
  )
}
