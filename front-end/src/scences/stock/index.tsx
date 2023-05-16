import { Box } from "@mui/material";
import Header from "../../components/header";

const Stock = () => {
  return (
    <Box
      m={"16px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Header title={"STOCK"} subtitle={"Track All Stocks"} />
    </Box>
  );
};

export default Stock;
