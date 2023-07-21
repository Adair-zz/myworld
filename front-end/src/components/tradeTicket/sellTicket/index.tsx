import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useSelector } from "react-redux";
import { Box, Autocomplete, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { tokens } from "../../../theme";
import { RootState } from "../../../store/store";
import {
  placeSellOrder,
  fetchDemoHoldings,
} from "../../../utils/controller/demoTradingController";
import { getCurrentDate, getCurrentTime } from "../../../utils/dateTime";

const sellOptionsProcess = (demoHoldings: { [key: string]: any }[]) => {
  const stockMarketOptions: string[] = [];
  const stockCompanyNameOptions: string[] = [];
  const stockSymbolOptions: string[] = [];

  demoHoldings.forEach((holding) => {
    const { market, company_name, stock_symbol } = holding;
    if (!stockMarketOptions.includes(market)) {
      stockMarketOptions.push(market);
    }
    stockCompanyNameOptions.push(company_name);
    stockSymbolOptions.push(stock_symbol);
  });

  return { stockMarketOptions, stockCompanyNameOptions, stockSymbolOptions };
};

const SellTicket = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const selectedStock = useSelector((state: RootState) => state.stockSelect);
  const [demoHoldings, setDemoHoldings] = useState([]);

  useEffect(() => {
    const fetchDemoHoldingsData = async () => {
      const response = await fetchDemoHoldings();
      setDemoHoldings(response.data);
    };

    fetchDemoHoldingsData();
  }, []);

  const { stockMarketOptions, stockCompanyNameOptions, stockSymbolOptions } =
    sellOptionsProcess(demoHoldings);

  const [formData, setFormData] = useState<{ [key: string]: any }>({
    market: "",
    company_name: "",
    stock_symbol: "",
    transaction_type: "sell",
    stock_value: "",
    quantity: "",
    brokerage_fee: "",
    total_amount: "",
    tp_price: "0",
    sl_price: "0",
    date: "",
    time: "",
  });

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    if (
      name === "stock_value" ||
      name === "quantity" ||
      name === "brokerage_fee"
    ) {
      const stockValue = parseFloat(
        name === "stock_value" ? newValue : formData.stock_value
      );
      const quantity = parseFloat(
        name === "quantity" ? newValue : formData.quantity
      );
      const fee = parseFloat(
        name === "brokerage_fee" ? newValue : formData.brokerage_fee
      );

      if (!isNaN(stockValue) && !isNaN(quantity) && !isNaN(fee)) {
        const totalAmount = stockValue * quantity + fee;
        setFormData((prevState) => ({
          ...prevState,
          total_amount: totalAmount.toString(),
        }));
      }
    }
  };

  const handleSellOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sellOrderInfo = {
      market: selectedStock.market,
      company_name: selectedStock.company_name,
      stock_symbol: selectedStock.stock_symbol,
      transaction_type: formData.transaction_type,
      stock_value: parseFloat(formData.stock_value),
      quantity: parseFloat(formData.quantity),
      total_amount: parseFloat(formData.total_amount),
      tp_price: parseFloat(formData.tp_price),
      sl_price: parseFloat(formData.sl_price),
      brokerage_fee: parseFloat(formData.brokerage_fee),
      date: getCurrentDate(),
      time: getCurrentTime(),
    };

    try {
      const res = await placeSellOrder(sellOrderInfo);
      if (!res?.status) {
        console.log("error");
      }
    } catch (e: any) {
      console.log("failed, " + e.message);
    }
  };

  return (
    <Box m={"20px 5px 0 5px"}>
      <form onSubmit={handleSellOrder}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"10%"}
          m={"0 0 15px 0"}
        >
          <Autocomplete
            value={selectedStock.market}
            options={stockMarketOptions}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Market" variant="standard" />
            )}
            sx={{ width: "40%" }}
          />

          <Autocomplete
            value={selectedStock.stock_symbol}
            options={stockSymbolOptions}
            filterSelectedOptions
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
        >
          <Autocomplete
            value={selectedStock.company_name}
            options={stockCompanyNameOptions}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField {...params} label="Company Name" variant="standard" />
            )}
            sx={{ width: "90%" }}
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
            label="Stock Value"
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
            value={formData.brokerage_fee}
            label="Fee"
            name="brokerage_fee"
            type="number"
            variant="standard"
            required
            onChange={handleInput}
            sx={{
              width: "40%",
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

          <TextField
            value={formData.total_amount}
            label="Total Amount"
            name="total_amount"
            type="number"
            variant="standard"
            required
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
              backgroundColor: colors.redAccent[600],
              width: "35%",
              borderRadius: "15px",
              "&:hover": {
                background: colors.redAccent[700],
              },
              "&:action": {
                backgroundColor: colors.redAccent[800],
              },
            }}
          >
            Sell {selectedStock.stock_symbol}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SellTicket;
