import { useEffect, ChangeEvent } from "react";
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
import { StockMarketType } from "../../utils/interface";
import { fetchStockMarket } from "../../store/stockMarketSlice";
import { statusChange } from "../../store/stockSelectSlice";

const optionsProcess = (stockMarket: StockMarketType[]) => {
  const stockMarketOptions: string[] = [];
  const stockCompanyNameOptions: string[] = [];
  const stockSymbolOptions: string[] = [];
  stockMarket.map((stock) => {
    const { market, company_name, stock_symbol } = stock;
    if (!stockMarketOptions.includes(market)) {
      stockMarketOptions.push(market);
    }
    stockCompanyNameOptions.push(company_name);
    stockSymbolOptions.push(stock_symbol);
  });
  return { stockMarketOptions, stockCompanyNameOptions, stockSymbolOptions };
};

const TradeTicket = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchStockMarket());
  }, []);

  const colors = tokens(theme.palette.mode);
  const stockMarket = useSelector((state: RootState) => state.stockMarket);
  const selectedstock = useSelector((state: RootState) => state.stockSelect);
  const { stockMarketOptions, stockCompanyNameOptions, stockSymbolOptions } =
    optionsProcess(stockMarket);

  console.log(stockSymbolOptions);

  const handleSelectedStockChange = (
    event: ChangeEvent<{}>,
    newValue: string | "" | null,
    type: string
  ) => {
    switch (type) {
      case "market":
        console.log("market");
        break;
      case "company_name":
        console.log("com");
        break;
      case "stock_symbol":
        console.log("hi, symbol");
        console.log("hi");
        break;
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
    <Box m={"25px 5px 0 5px"}>
      <Box display={"flex"} justifyContent={"center"}>
        <ButtonGroup>
          <Button
            variant="contained"
            sx={{
              width: "50%",
              backgroundColor: colors.greenAccent[700],
            }}
            onClick={() => dispatch(statusChange("buy"))}
            size={"small"}
          >
            Buy
          </Button>
          <Button
            variant="contained"
            sx={{ width: "50%", backgroundColor: colors.redAccent[700] }}
            onClick={() => dispatch(statusChange("sell"))}
            size={"small"}
          >
            Sell
          </Button>
        </ButtonGroup>
      </Box>

      {selectedstock.status === "buy" && (
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
              onChange={(
                event: ChangeEvent<{}>,
                newValue: string | "" | null
              ) => {
                handleSelectedStockChange(event, newValue, "market");
              }}
              renderInput={(params) => (
                <TextField {...params} label="Market" variant="standard" />
              )}
              sx={{ width: "40%" }}
            />

            <Autocomplete
              value={selectedstock.stock_symbol}
              options={stockSymbolOptions}
              filterSelectedOptions
              onChange={(
                event: ChangeEvent<{}>,
                newValue: string | "" | null
              ) => {
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
                />
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
      )}

      {selectedstock.status === "sell" && (
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
              options={options}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Market" variant="standard" />
              )}
              sx={{ width: "40%" }}
            />

            <Autocomplete
              value={selectedstock.stock_symbol}
              options={options}
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
            gap={"10%"}
          >
            <Autocomplete
              value={selectedstock.company_name}
              options={options}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company Name"
                  variant="standard"
                />
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
                <TextField {...params} label="Total" variant="standard" />
              )}
              sx={{ width: "40%" }}
            />

            <Autocomplete
              options={options}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Quantity" variant="standard" />
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
              Available: your holdings
            </Typography>
            <Typography color={colors.grey[100]} width={"50%"}>
              Max Sell: your balance
            </Typography>
          </Box>

          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.redAccent[600],
                width: "35%",
                borderRadius: "15px",
              }}
            >
              Sell {selectedstock.stock_symbol}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TradeTicket;
