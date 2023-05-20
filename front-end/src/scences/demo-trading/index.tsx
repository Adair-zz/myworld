import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/header";
import TradeTicket from "../../components/trade-ticket";
import Transaction from "../../components/transaction";

const DemoTrading = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get(
        "http://localhost:8080/demo-transaction"
      );
      console.log(response.data);
      setTransactions(response.data);
    };
    fetchTransactions();
  }, []);

  return (
    <Box m={"0 10px 0 10px"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header
          title={"DEMO TRADING"}
          subtitle={"Improve Your Skills"}
          titleVariant={"h2"}
          subtitleVariant={"h5"}
        />
      </Box>

      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(12, 1fr)"}
        gridAutoRows={"100px"}
      >
        <Box
          gridColumn={"span 8"}
          gridRow={"span 3"}
          sx={{
            backgroundColor: colors.primary[400],
            margin: "0 5px 5px 0",
          }}
        ></Box>
        <Box
          gridColumn={"span 4"}
          gridRow={"span 4"}
          sx={{ backgroundColor: colors.primary[400] }}
          overflow={"auto"}
          m={"0 0 5px 0"}
        >
          <TradeTicket />
        </Box>
        <Box
          gridColumn={"span 8"}
          gridRow={"span 3"}
          sx={{ backgroundColor: colors.primary[400], margin: "0 5px 0 0" }}
          overflow={"auto"}
        >
          {transactions != null && <Transaction transactions={transactions} />}
        </Box>
        <Box
          gridColumn={"span 4"}
          gridRow={"span 2"}
          sx={{ backgroundColor: colors.primary[400] }}
          overflow={"auto"}
        >
          {/* <StockNews /> */}
          <Typography>Stock news</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DemoTrading;
