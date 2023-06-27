import { useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Typography,
  Autocomplete,
  TextField,
  Stack,
  Slider,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";

import { tokens } from "../../theme";
import { AppDispatch, RootState } from "../../store/store";
import { StockMarketType } from "../../utils/interface";
import {
  getCompanyNameInfo,
  getStockSymbolInfo,
  submitBuyTicket,
  setStockValue,
  setQuantity,
  setTotalAmount,
  setTpPrice,
  setSlPrice,
} from "../../store/stockSelectSlice";
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

const quantityMarks = [
  {
    value: 0,
  },
  {
    value: 25,
  },
  {
    value: 50,
  },
  {
    value: 75,
  },
  {
    value: 100,
  },
];

const triggerMarks = [
  {
    value: 0,
  },
  {
    value: 5,
  },
  {
    value: 10,
  },
  {
    value: 15,
  },
  {
    value: 20,
  },
];

const valueLabelFormat = (value: number) => {
  return `${value}%`;
};

const BuyTicket = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const [tpPercentage, setTpPercentage] = useState<number>(0);
  const [slPercentage, setSlPercentage] = useState<number>(0);

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

  const handleTpPercentageChange = (
    _: Event,
    newValue: number | number[]
  ): void => {
    setTpPercentage(newValue as number);
  };

  const handleSlPercentageChange = (
    _: Event,
    newValue: number | number[]
  ): void => {
    setSlPercentage(newValue as number);
  };

  const handleBuyTicket = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      market: selectedStock.market,
      company_name: selectedStock.company_name,
      stock_symbol: selectedStock.stock_symbol,
      transaction_type: "buy",
      stock_value: selectedStock.stock_value,
      quantity: selectedStock.quantity,
      total_amount:
        selectedStock.total_amount !== undefined &&
        selectedStock.brokerage_fee !== undefined
          ? selectedStock.total_amount + selectedStock.brokerage_fee
          : undefined,
      tp_price: selectedStock.tp_price,
      sl_price: selectedStock.sl_price,
      brokerage_fee: selectedStock.brokerage_fee,
      date: getCurrentDate(),
      time: getCurrentTime(),
    };

    dispatch(submitBuyTicket(data));
  };

  const StyledBox = styled(Box)({
    color: colors.grey[100],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 0 15px 0",
    gap: "10%",
  });

  const StyledSlider = styled(Slider)({
    color: colors.grey[400],
    "& .MuiSlider-valueLabel": {
      top: 45,
      backgroundColor: "transparent",
      border: "none",
      "&::before": {
        display: "none",
      },
    },
  });

  return (
    <Box m={"20px 5px 0 5px"}>
      <form onSubmit={handleBuyTicket}>
        <StyledBox>
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
            }}
          />
        </StyledBox>

        <StyledBox>
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
            }}
          />
          <TextField
            value={selectedStock.stock_value}
            onChange={(
              event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              const newStockValue = isNaN(parseFloat(event.target.value))
                ? undefined
                : parseFloat(event.target.value);
              dispatch(setStockValue(newStockValue));
            }}
            type="number"
            label="Stock Value"
            variant="standard"
            required
            sx={{
              width: "25%",
              ".Mui-focused": {
                color: colors.grey[100],
              },
              ".MuiTextField-root": {
                color: colors.grey[100],
              },
            }}
          />
        </StyledBox>

        <StyledBox>
          <Stack gap={"10px"} sx={{ width: "40%" }}>
            <TextField
              value={selectedStock.quantity}
              onChange={(
                event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                const newquantity = isNaN(parseFloat(event.target.value))
                  ? undefined
                  : parseFloat(event.target.value);
                dispatch(setQuantity(newquantity));
              }}
              type="number"
              label="quantity"
              variant="standard"
              required
              sx={{
                ".Mui-focused": {
                  color: colors.grey[100],
                },
              }}
            />
            <StyledSlider
              value={tpPercentage}
              onChange={handleTpPercentageChange}
              valueLabelFormat={valueLabelFormat}
              step={1}
              marks={quantityMarks}
              min={0}
              max={100}
              valueLabelDisplay="on"
            />
          </Stack>

          <Stack gap={"10px"} sx={{ width: "40%" }}>
            <TextField
              value={selectedStock.total_amount}
              onChange={(
                event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                const newTotalAmount = isNaN(parseFloat(event.target.value))
                  ? undefined
                  : parseFloat(event.target.value);
                dispatch(setTotalAmount(newTotalAmount));
              }}
              type="number"
              label="Total Amount"
              variant="standard"
              required
              sx={{
                ".Mui-focused": {
                  color: colors.grey[100],
                },
              }}
            />
            <StyledSlider
              value={tpPercentage}
              onChange={handleTpPercentageChange}
              valueLabelFormat={valueLabelFormat}
              step={1}
              marks={quantityMarks}
              min={0}
              max={100}
              valueLabelDisplay="on"
            />
          </Stack>
        </StyledBox>

        <StyledBox sx={{ margin: "30px 0 15px 0" }} color={colors.grey[300]}>
          <Typography width={"40%"}>Available: your balance</Typography>
          <Typography width={"40%"}>Max Buy: your balance</Typography>
        </StyledBox>

        <StyledBox>
          <Stack gap={"10px"} sx={{ width: "40%" }}>
            <TextField
              value={selectedStock.tp_price}
              onChange={(
                event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                const newTpPrice = isNaN(parseFloat(event.target.value))
                  ? undefined
                  : parseFloat(event.target.value);
                dispatch(setTpPrice(newTpPrice));
              }}
              type="number"
              label="TP Trigger Price"
              variant="standard"
              required
              sx={{
                ".Mui-focused": {
                  color: colors.grey[100],
                },
              }}
            />

            <StyledSlider
              value={tpPercentage}
              onChange={handleTpPercentageChange}
              valueLabelFormat={valueLabelFormat}
              step={1}
              marks={triggerMarks}
              min={0}
              max={20}
              valueLabelDisplay="on"
            />
          </Stack>
          <Stack gap={"10px"} sx={{ width: "40%" }}>
            <TextField
              value={selectedStock.sl_price}
              onChange={(
                event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                const newSlPrice = isNaN(parseFloat(event.target.value))
                  ? undefined
                  : parseFloat(event.target.value);
                dispatch(setSlPrice(newSlPrice));
              }}
              label="SL Trigger Price"
              variant="standard"
              required
              sx={{
                ".Mui-focused": {
                  color: colors.grey[100],
                },
              }}
            />
            <StyledSlider
              value={slPercentage}
              onChange={handleSlPercentageChange}
              valueLabelFormat={valueLabelFormat}
              step={1}
              marks={triggerMarks}
              min={0}
              max={10}
              valueLabelDisplay="on"
            />
          </Stack>
        </StyledBox>

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
