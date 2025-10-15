import {
  AppBar,
  Box,
  Toolbar,
} from "@mui/material";

export const TopMenu = (props) => {
  return (
    <Box sx={{ flexGrow: 100, mb: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div style={{ flex: 100 }}></div>
          <span>React-Node-Elastic-Search</span>
        </Toolbar>
      </AppBar>
    </Box>
  );
};