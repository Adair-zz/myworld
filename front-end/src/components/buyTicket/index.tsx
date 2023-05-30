import { useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Typography,
  Autocomplete,
  TextField,
  useTheme,
} from "@mui/material";

import { tokens } from "../../theme";
import { AppDispatch, RootState } from "../../store/store";
import { StockMarketType } from "../../utils/interface";
import {
  getCompanyNameInfo,
  getStockSymbolInfo,
} from "../../store/stockSelectSlice";

const optionsProcess = (stockMarket: StockMarketType[]) => {
  const stockMarketOptions: string[] = [];
  const stockCompanyNameOptions: string[] = [];
  const stockSymbolOptions: string[] = [];

  stockMarket.forEach((stock) => {
    const { market, company_name, stock_symbol } = stock;
    if (!stockMarketOptions.includes(market)) {
      stockMarketOptions.push(market);
    }
    stockCompanyNameOptions.push(company_name);
    stockSymbolOptions.push(stock_symbol);
  });
  return { stockMarketOptions, stockCompanyNameOptions, stockSymbolOptions };
};

const BuyTicket = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const colors = tokens(theme.palette.mode);
  const stockMarket = useSelector((state: RootState) => state.stockMarket);
  const selectedstock = useSelector((state: RootState) => state.stockSelect);
  const { stockMarketOptions, stockCompanyNameOptions, stockSymbolOptions } =
    optionsProcess(stockMarket);

  const handleSelectedStockChange = (
    event: ChangeEvent<{}>,
    newValue: string | "" | null,
    type: string
  ) => {
    if (newValue != null && newValue.length > 1) {
      switch (type) {
        case "company_name":
          dispatch(getCompanyNameInfo(newValue));
          break;
        case "stock_symbol":
          dispatch(getStockSymbolInfo(newValue));
          break;
      }
    }
  };

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
    <Box m={"20px 5px 0 5px"}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"10%"}
        m={"0 0 15px 0"}
      >
        <Autocomplete
          value={selectedstock.market}
          options={stockMarketOptions}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="Market" variant="standard" />
          )}
          sx={{ width: "40%" }}
        />

        <Autocomplete
          value={selectedstock.stock_symbol}
          options={stockSymbolOptions}
          filterSelectedOptions
          onChange={(event: ChangeEvent<{}>, newValue: string | "" | null) => {
            handleSelectedStockChange(event, newValue, "stock_symbol");
          }}
          renderInput={(params) => (
            <TextField {...params} label="Symbol" variant="standard" />
          )}
          sx={{ width: "40%" }}
        />
      </Box>

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        m={"0 0 15px 0"}
        gap={"10%"}
      >
        <Autocomplete
          value={selectedstock.company_name}
          options={stockCompanyNameOptions}
          filterSelectedOptions
          onChange={(event: ChangeEvent<{}>, newValue: string | "" | null) => {
            handleSelectedStockChange(event, newValue, "company_name");
          }}
          renderInput={(params) => (
            <TextField {...params} label="Company Name" variant="standard" />
          )}
          sx={{ width: "55%" }}
        />

        <Autocomplete
          options={options}
          // disabled
          defaultValue={"ption 2"}
          renderInput={(params) => (
            <TextField {...params} label="Stock Value" variant="standard" />
          )}
          sx={{ width: "25%" }}
        />
      </Box>

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"10%"}
        m={"0 0 15px 0"}
      >
        <Autocomplete
          options={options}
          renderInput={(params) => (
            <TextField {...params} label="Amount" variant="standard" />
          )}
          sx={{ width: "40%" }}
        />

        <Autocomplete
          options={options}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="Total" variant="standard" />
          )}
          sx={{ width: "40%" }}
        />
      </Box>

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        m={"0 5% 30px 5%"}
        gap={"10%"}
      >
        <Typography color={colors.grey[100]} width={"50%"}>
          Available: your balance
        </Typography>
        <Typography color={colors.grey[100]} width={"50%"}>
          Max Buy: your balance
        </Typography>
      </Box>

      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.greenAccent[600],
            width: "35%",
            borderRadius: "15px",
          }}
        >
          Buy {selectedstock.stock_symbol}
        </Button>
      </Box>
    </Box>
  );
};

export default BuyTicket;
