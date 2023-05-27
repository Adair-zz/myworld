import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";

import { tokens } from "../../theme";
import { RootState, AppDispatch } from "../../store/store";
import { fetchDemoHoldings } from "../../store/stockHoldingsSlice";
import { fetchDemoTransactions } from "../../store/stockTransactionsSlice";
import Header from "../../components/header";
import Holding from "../../components/holdidng";
import TradeTicket from "../../components/tradeTicket";
import Transaction from "../../components/transaction";

const DemoTrading = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDemoHoldings());
    dispatch(fetchDemoTransactions());
  }, []);

  const colors = tokens(theme.palette.mode);
  const demoHoldings = useSelector(
    (state: RootState) => state.stockHoldings.demo_holdings
  );
  const demoTransactions = useSelector(
    (state: RootState) => state.stockTransactions.demo_transactions
  );

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
          overflow={"auto"}
        >
          <Holding holdings={demoHoldings} />
        </Box>
        <Box
          gridColumn={"span 4"}
          gridRow={"span 4"}
          sx={{ backgroundColor: colors.primary[400] }}
          m={"0 0 5px 0"}
          overflow={"auto"}
        >
          <TradeTicket />
        </Box>
        <Box
          gridColumn={"span 8"}
          gridRow={"span 3"}
          sx={{ backgroundColor: colors.primary[400], margin: "0 5px 0 0" }}
          overflow={"auto"}
        >
          <Transaction transactions={demoTransactions} />
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
