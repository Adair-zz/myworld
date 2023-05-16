import { Box } from "@mui/material";
import Header from "../../components/header";

const Dashboard = () => {
  return (
    <Box m={"16px"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header title={"DASHBOARD"} subtitle={"Welcome to Your Dashboard"} />
      </Box>
    </Box>
  );
};

export default Dashboard;
