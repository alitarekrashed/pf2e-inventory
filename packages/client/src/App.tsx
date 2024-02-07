import "./App.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import DarkModeToggle, { ColorModeContext } from "./components/dark-mode-toggle.component"
import { Box } from "@mui/system"
import Home from "./components/home.component"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import React from "react"

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light")
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      },
    }),
    [],
  )

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "2px",
              paddingBottom: "4px",
            }}
          >
            <Box sx={{ marginRight: "8px" }}>
              <DarkModeToggle />
            </Box>
          </Container>
          <Container
            sx={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ px: "8px" }}>
              <Home />
            </Box>
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default App
