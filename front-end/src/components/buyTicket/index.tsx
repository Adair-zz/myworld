import { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Typography,
  Autocomplete,
  TextField,
  useTheme,
  Stack,
  Slider,
  styled,
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

const amountMarks = [
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
  const selectedstock = useSelector((state: RootState) => state.stockSelect);
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
      }
    }
  };

  const handleTpPercentageChange = (
    event: Event,
    newValue: number | number[]
  ): void => {
    setTpPercentage(newValue as number);
  };

  const handleSlPercentageChange = (
    event: Event,
    newValue: number | number[]
  ): void => {
    setSlPercentage(newValue as number);
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
    color: colors.grey[100],
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
      <StyledBox>
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
      </StyledBox>

      <StyledBox>
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

        <TextField
          label="Stock Value"
          variant="standard"
          sx={{ width: "25%" }}
        />
      </StyledBox>

      <StyledBox>
        <Stack gap={"10px"} sx={{ width: "40%" }}>
          <TextField label="Amount" variant="standard" />
          <StyledSlider
            value={tpPercentage}
            onChange={handleTpPercentageChange}
            valueLabelFormat={valueLabelFormat}
            step={1}
            marks={amountMarks}
            min={0}
            max={100}
            valueLabelDisplay="on"
          />
        </Stack>

        <Stack gap={"10px"} sx={{ width: "40%" }}>
          <TextField label="Total" variant="standard" />
          <StyledSlider
            value={tpPercentage}
            onChange={handleTpPercentageChange}
            valueLabelFormat={valueLabelFormat}
            step={1}
            marks={amountMarks}
            min={0}
            max={100}
            valueLabelDisplay="on"
          />
        </Stack>
      </StyledBox>

      <StyledBox>
        <Typography width={"40%"}>Available: your balance</Typography>
        <Typography width={"40%"}>Max Buy: your balance</Typography>
      </StyledBox>

      <StyledBox>
        <Stack gap={"10px"} sx={{ width: "40%" }}>
          <TextField label="TP Trigger Price" variant="standard" />
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
          <TextField label="SL Trigger Price" variant="standard" />
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
