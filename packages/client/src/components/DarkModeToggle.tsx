import Button from "@mui/joy/Button";
import { useColorScheme } from "@mui/joy/styles";
import React from "react";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

export default function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? <FaSun /> : <FaMoon />}
    </Button>
  );
}
