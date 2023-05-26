import { Box, Button, ButtonGroup, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";

import { tokens } from "../../theme";
import Header from "../header";
import { stockSelect } from "../../store/stockSelectSlice";
import { StockHoldingsType } from "../../utils/interface";

const Holding = ({ holdings }: { holdings: StockHoldingsType[] }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "market", headerName: "Market", flex: 0.6 },
    { field: "company_name", headerName: "Name", flex: 1.7 },
    { field: "stock_symbol", headerName: "Symbol", flex: 0.5 },
    { field: "avg_cost_price", headerName: "Avg Cost", flex: 0.5 },
    { field: "quantity", headerName: "Quantity", flex: 0.5 },
    { field: "total_cost_price", headerName: "Total Cost", flex: 0.6 },
    { field: "equity", headerName: "Equity", flex: 0.5 },
    { field: "latest_closing_price", headerName: "Latest Price", flex: 0.6 },
    {
      field: "_id",
      headerName: "",
      renderCell: ({ row }: { row: StockHoldingsType }) => {
        const stockInfo = {
          market: row.market,
          company_name: row.company_name,
          stock_symbol: row.stock_symbol,
        };

        return (
          <ButtonGroup>
            <Button
              variant="contained"
              sx={{
                width: "50%",
                backgroundColor: colors.greenAccent[700],
              }}
              size={"small"}
              id={row._id}
              onClick={() =>
                dispatch(stockSelect({ ...stockInfo, status: "buy" }))
              }
            >
              Buy
            </Button>
            <Button
              variant="contained"
              sx={{ width: "50%", backgroundColor: colors.redAccent[700] }}
              size={"small"}
              id={row._id}
              onClick={() =>
                dispatch(
                  stockSelect({
                    ...stockInfo,
                    status: "sell",
                  })
                )
              }
            >
              Sell
            </Button>
          </ButtonGroup>
        );
      },
      flex: 0.8,
    },
  ];

  return (
    <Box m={"5px 5px 0 5px"}>
      <Header
        title="Current Holdings"
        subtitle="Tracking Your Portfolio"
        titleVariant="h4"
        subtitleVariant="h6"
        isAlign={true}
      />
      {holdings != null && (
        <DataGrid
          rows={holdings}
          columns={columns}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
        />
      )}
    </Box>
  );
};

export default Holding;
