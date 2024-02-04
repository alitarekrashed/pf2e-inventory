import { useState } from "react";
import "./App.css";
import "@fontsource/inter";
import Button from "@mui/joy/Button";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import ModeToggle from "./components/DarkModeToggle";
import { Box } from "@mui/system";

function App() {
  const [count, setCount] = useState(0);

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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{ marginLeft: 0 }}
            variant="solid"
            onClick={() => setCount((count) => count + 1)}
          >
            count is {count}
          </Button>
        </Sheet>
      </CssVarsProvider>
    </>
  );
}

export default App;
