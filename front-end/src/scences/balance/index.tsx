import { Box } from "@mui/material";
import Header from "../../components/header";
const Balance = () => {
  return (
    <Box
      m={"16px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Header
        title={"BALANCE"}
        subtitle={"Account Balance"}
        titleVariant="h3"
        subtitleVariant="h6"
      />
    </Box>
  );
};

export default Balance;
