import { Box } from "@mui/material";
import Header from "../../components/header";

const Stock = () => {
  return (
    <Box
      m={"0 0 0 10px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Header
        title={"STOCK"}
        subtitle={"Track All Stocks"}
        titleVariant="h3"
        subtitleVariant="h6"
      />
    </Box>
  );
};

export default Stock;
