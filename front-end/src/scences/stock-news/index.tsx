import { Box } from "@mui/material";
import Header from "../../components/header";

const StockNews = () => {
  return (
    <Box
      m={"16px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Header title={"STOCK NEWS"} subtitle={"Latest Stock Analyst News"} />
    </Box>
  );
};

export default StockNews;
