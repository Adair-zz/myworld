import { useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { tokens } from "../../theme";
import { AppDispatch, RootState } from "../../store/store";
import { StockMarketType } from "../../utils/interface";
import {
  getCompanyNameInfo,
  getStockSymbolInfo,
} from "../../store/stockSelectSlice";
import { placeBuyOrder } from "../../utils/demoTradingController";
import { getCurrentDate, getCurrentTime } from "../../utils/dateTime";

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
  const selectedStock = useSelector((state: RootState) => state.stockSelect);
  const { stockMarketOptions, stockCompanyNameOptions, stockSymbolOptions } =
    optionsProcess(stockMarket);

  const handleSelectedStockChange = (
    _: ChangeEvent<{}>,
    newValue: string | "" | null,
    type: string
  ): void => {
    if (newValue != null && newValue.length > 1) {
      switch (type) {
        case "company_name":
          dispatch(getCompanyNameInfo(newValue));
          break;
        case "stock_symbol":
          dispatch(getStockSymbolInfo(newValue));
          break;
        default:
          return;
      }
    }
  };

  const handleBuyOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const buyOrderInfo = {
      market: selectedStock.market,
      company_name: selectedStock.company_name,
      stock_symbol: selectedStock.stock_symbol,
      transaction_type: formData.transaction_type,
      stock_value: parseFloat(formData.stock_value),
      quantity: parseFloat(formData.quantity),
      total_amount:
        parseFloat(formData.stock_value) * parseFloat(formData.quantity) +
        parseFloat(formData.stock_value) * parseFloat(formData.brokerage_fee),
      tp_price: parseFloat(formData.tp_price),
      sl_price: parseFloat(formData.sl_price),
      brokerage_fee: parseFloat(formData.brokerage_fee),
      date: getCurrentDate(),
      time: getCurrentTime(),
    };

    try {
      const res = await placeBuyOrder(buyOrderInfo);
      console.log(res);
      if (!res?.status) {
        console.log("error");
      }
    } catch (e: any) {
      console.log("failed, " + e.message);
    }
  };

  const [formData, setFormData] = useState<{ [key: string]: any }>({
    market: "",
    company_name: "",
    stock_symbol: "",
    transaction_type: "buy",
    stock_value: "",
    quantity: "",
    brokerage_fee: "",
    total_amount: "",
    tp_price: "",
    sl_price: "",
    date: "",
    time: "",
  });

  console.log(formData);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  return (
    <Box m={"20px 5px 0 5px"}>
      <form onSubmit={handleBuyOrder}>
        <Box
          sx={{
            color: colors.grey[100],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 0 15px 0",
            gap: "10%",
          }}
        >
          <Autocomplete
            value={selectedStock.market}
            options={stockMarketOptions}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Market"
                variant="standard"
                required
              />
            )}
            sx={{
              width: "40%",
              ".Mui-focused": {
                color: colors.grey[100],
              },
              ".MuiFormLabel-root": {
                color: colors.grey[100],
              },
            }}
          />

          <Autocomplete
            value={selectedStock.stock_symbol}
            options={stockSymbolOptions}
            filterSelectedOptions
            onChange={(
              event: ChangeEvent<{}>,
              newValue: string | "" | null
            ) => {
              handleSelectedStockChange(event, newValue, "stock_symbol");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Symbol"
                variant="standard"
                required
              />
            )}
            aria-required
            sx={{
              width: "40%",
              ".Mui-focused": {
                color: colors.grey[100],
              },
              ".MuiFormLabel-root": {
                color: colors.grey[100],
              },
            }}
          />
        </Box>

        <Box
          sx={{
            color: colors.grey[100],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 0 15px 0",
            gap: "10%",
          }}
        >
          <Autocomplete
            value={selectedStock.company_name}
            options={stockCompanyNameOptions}
            filterSelectedOptions
            onChange={(
              event: ChangeEvent<{}>,
              newValue: string | "" | null
            ) => {
              handleSelectedStockChange(event, newValue, "company_name");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Company Name"
                variant="standard"
                required
              />
            )}
            aria-required
            sx={{
              width: "55%",
              ".Mui-focused": {
                color: colors.grey[100],
              },
              ".MuiFormLabel-root": {
                color: colors.grey[100],
              },
            }}
          />

          <TextField
            value={formData.brokerage_fee}
            label="Fee"
            name="brokerage_fee"
            type="number"
            variant="standard"
            required
            onChange={handleInput}
            sx={{
              width: "25%",
              ".Mui-focused": {
                color: colors.grey[100],
              },
              ".MuiTextField-root": {
                color: colors.grey[100],
              },
              ".MuiFormLabel-root": {
                color: colors.grey[100],
              },
            }}
          />
        </Box>

        <Box
          sx={{
            color: colors.grey[100],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 0 15px 0",
            gap: "10%",
          }}
        >
          <TextField
            value={formData.stock_value}
            label="Stock_value"
            name="stock_value"
            type="number"
            variant="standard"
            required
            onChange={handleInput}
            sx={{
              width: "40%",
              ".Mui-focused": {
                color: colors.grey[100],
              },
              ".MuiFormLabel-root": {
                color: colors.grey[100],
              },
            }}
          />

          <TextField
            value={formData.quantity}
            label="Quantity"
            name="quantity"
            type="number"
            variant="standard"
            required
            onChange={handleInput}
            sx={{
              width: "40%",
              ".Mui-focused": {
                color: colors.grey[100],
              },
              ".MuiFormLabel-root": {
                color: colors.grey[100],
              },
            }}
          />
        </Box>

        <Box
          sx={{
            color: colors.grey[300],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 0 15px 0",
            gap: "10%",
          }}
        >
          <Typography width={"40%"}>Available: your balance</Typography>
          <Typography width={"40%"}>Max Buy: your balance</Typography>
        </Box>

        <Box
          sx={{
            color: colors.grey[100],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 0 15px 0",
            gap: "10%",
          }}
        >
          <TextField
            value={formData.tp_price}
            label="TP Trigger Price"
            name="tp_price"
            type="number"
            variant="standard"
            required
            onChange={handleInput}
            sx={{
              width: "40%",
              ".Mui-focused": {
                color: colors.grey[100],
              },
              ".MuiFormLabel-root": {
                color: colors.grey[100],
              },
            }}
          />

          <TextField
            value={formData.sl_price}
            label="SL Trigger Price"
            name="sl_price"
            type="number"
            variant="standard"
            required
            onChange={handleInput}
            sx={{
              width: "40%",
              ".Mui-focused": {
                color: colors.grey[100],
              },
              ".MuiFormLabel-root": {
                color: colors.grey[100],
              },
            }}
          />
        </Box>

        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          m={"50px 0 0 0"}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              width: "35%",
              borderRadius: "15px",
              "&:hover": {
                background: colors.greenAccent[700],
              },
              "&:action": {
                backgroundColor: colors.greenAccent[800],
              },
            }}
          >
            Buy {selectedStock.stock_symbol}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default BuyTicket;
