import { Box } from "@mui/material";
import Header from "../../components/header";

const DemoTrading = () => {
  return (
    <Box
      m={"16px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Header title={"DEMO TRADING"} subtitle={"Improve Your Skills"} />
    </Box>
  );
};

export default DemoTrading;
