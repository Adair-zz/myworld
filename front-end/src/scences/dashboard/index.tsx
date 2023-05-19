import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/header";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m={"10px"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header
          title={"DASHBOARD"}
          subtitle={"Welcome to Your Dashboard"}
          titleVariant="h3"
          subtitleVariant="h6"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
