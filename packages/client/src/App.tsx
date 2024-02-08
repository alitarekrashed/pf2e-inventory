import "./App.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

import DarkModeToggle, { ColorModeContext } from "./components/dark-mode-toggle.component"
import Home from "./components/home.component"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import React from "react"
import { Outlet } from "react-router-dom"

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("dark")
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
          <Container maxWidth={"xl"}>
            <DarkModeToggle />
            <Container maxWidth={"xl"}>
              <Outlet />
            </Container>
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default App
