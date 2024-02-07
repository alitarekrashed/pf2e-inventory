import "./App.css"
import "@fontsource/inter"
import { CssVarsProvider } from "@mui/joy/styles"
import Sheet from "@mui/joy/Sheet"
import ModeToggle from "./components/dark-mode-toggle.component"
import { Box } from "@mui/system"
import Home from "./components/home.component"

function App() {
  return (
    <>
      <CssVarsProvider>
        <Sheet
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "2px",
            paddingBottom: "4px",
          }}
        >
          <Box sx={{ marginRight: "8px" }}>
            <ModeToggle />
          </Box>
        </Sheet>
        <Sheet
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
        </Sheet>
      </CssVarsProvider>
    </>
  )
}

export default App
