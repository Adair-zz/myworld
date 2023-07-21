import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  ButtonGroup,
  Button,
  useTheme,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";

import { tokens } from "../../theme";
import { AppDispatch, RootState } from "../../store/store";
import { fetchStockMarket } from "../../store/stockMarketSlice";
import { statusChange } from "../../store/stockSelectSlice";

import BuyTicket from "../buyTicket";
import SellTicket from "./sellTicket";

const TradeTicket = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchStockMarket());
  }, []);

  const colors = tokens(theme.palette.mode);
  const selectedstock = useSelector((state: RootState) => state.stockSelect);

  const options = [
    "",
    "NASDAQ",
    "BABA",
    "Alibaba Group Holding Limited American Depositary Shares each representing eight Ordinary share",
    "OptionOptionOptionOptionOptionOptionOption 1",
    "ption 2",
    "tion 3",
    "ion 4",
    "Option 5",
  ];

  return (
    <Box m={"25px 5px 0 5px"}>
      <Box display={"flex"} justifyContent={"center"}>
        <ButtonGroup>
          <Button
            variant="contained"
            sx={{
              width: "50%",
              backgroundColor: colors.greenAccent[700],
              "&:hover": {
                backgroundColor: colors.greenAccent[800],
              },
              "&:action": {
                backgroundColor: colors.greenAccent[900],
              },
            }}
            onClick={() => dispatch(statusChange("buy"))}
            size={"small"}
          >
            Buy
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "50%",
              backgroundColor: colors.redAccent[700],
              "&:hover": {
                backgroundColor: colors.redAccent[800],
              },
              "&:action": {
                backgroundColor: colors.redAccent[900],
              },
            }}
            onClick={() => dispatch(statusChange("sell"))}
            size={"small"}
          >
            Sell
          </Button>
        </ButtonGroup>
      </Box>

      {selectedstock.transaction_type === "buy" && <BuyTicket />}

      {selectedstock.transaction_type === "sell" && <SellTicket />}
    </Box>
  );
};

export default TradeTicket;
