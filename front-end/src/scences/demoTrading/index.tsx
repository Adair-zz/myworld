import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReceiptOutlined } from "@mui/icons-material";

import { tokens } from "../../theme";
import { fetchDemoHoldings } from "../../utils/controller/demoTradingController";
import Header from "../../components/header";
import Holding from "../../components/holdidng";
import TradeTicket from "../../components/tradeTicket";

import { StockHoldingsType } from "../../utils/typings";

const DemoTrading = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [demoHoldings, setDemoHoldings] = useState<StockHoldingsType[]>([]);

  useEffect(() => {
    const fetchDemoHoldingsData = async () => {
      const response = await fetchDemoHoldings();
      setDemoHoldings(response.data);
    };

    fetchDemoHoldingsData();
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
        <Link
          to="/demo-trading/demo-transactions"
          style={{ textDecoration: "none" }}
        >
          <Box display={"flex"} gap={"6px"} color={colors.grey[100]}>
            <ReceiptOutlined />
            <Typography variant={"h5"}>All Transactions</Typography>
          </Box>
        </Link>
      </Box>

      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(12, 1fr)"}
        gridAutoRows={"100px"}
      >
        <Box
          gridColumn={"span 8"}
          gridRow={"span 4"}
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
          gridRow={"span 6"}
          sx={{ backgroundColor: colors.primary[400] }}
          overflow={"auto"}
        >
          <TradeTicket />
        </Box>
        <Box
          gridColumn={"span 8"}
          gridRow={"span 2"}
          sx={{ backgroundColor: colors.primary[400], margin: "0 5px 0 0" }}
          overflow={"auto"}
        >
          <Typography>AI Recommendation Here</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DemoTrading;
