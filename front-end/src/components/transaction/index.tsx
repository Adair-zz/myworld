import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { tokens } from "../../theme";
import { StockTransactionsType } from "../../utils/interface";
import Header from "../header";

const columns = [
  { field: "market", headerName: "Market", flex: 0.3 },
  { field: "company_name", headerName: "Name", flex: 1 },
  { field: "stock_symbol", headerName: "Symbol", flex: 0.3 },
  { field: "transaction_type", headerName: "Type", flex: 0.3 },
  { field: "stock_value", headerName: "Price", flex: 0.3 },
  { field: "quantity", headerName: "Quantity", flex: 0.3 },
  { field: "brokerage_fee", headerName: "Fees", flex: 0.3 },
  { field: "total_amount", headerName: "Amount", flex: 0.3 },
  {
    field: "tp_price",
    headerName: "TP Price",
    flex: 0.3,
  },
  {
    field: "sl_price",
    headerName: "SL Price",
    flex: 0.3,
  },
  { field: "date", headerName: "Date", flex: 0.3 },
  { field: "time", headerName: "Time", flex: 0.3 },
  { field: "_id", headerName: "Image", flex: 0.8 },
];

const Transaction = ({
  transactions,
}: {
  transactions: StockTransactionsType[];
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m={"5px 5px 0 5px"}>
      <Header
        title="Transactions"
        subtitle="Dive into Your Transaction History"
        titleVariant="h4"
        subtitleVariant="h6"
        isAlign={true}
      />
      <Box>
        {transactions != null && (
          <DataGrid
            rows={transactions}
            columns={columns}
            getRowId={(row) => row._id}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Transaction;
