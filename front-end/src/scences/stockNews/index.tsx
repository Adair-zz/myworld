import { Box } from "@mui/material";
import Header from "../../components/header";

const StockNews = () => {
  return (
    <Box
      m={"0 0 0 10px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Header
        title={"STOCK NEWS"}
        subtitle={"Latest Stock Analyst News"}
        titleVariant="h6"
        subtitleVariant="h3"
      />
    </Box>
  );
};

export default StockNews;
