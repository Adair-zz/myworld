import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { tokens } from "../../theme";
import { stockTransactionsType } from "../../utils/interface";
import Header from "../header";

const columns = [
  // { field: "_id", headerName: "ID" },
  { field: "market", headerName: "Market", flex: 0.7 },
  { field: "company_name", headerName: "Name", flex: 2 },
  { field: "stock_symbol", headerName: "Symbol", flex: 0.6 },
  { field: "transaction_type", headerName: "Type", flex: 0.5 },
  { field: "stock_value", headerName: "Price", flex: 0.6 },
  { field: "quantity", headerName: "Quantity", flex: 0.6 },
  { field: "brokerage_fee", headerName: "Fees", flex: 0.6 },
  { field: "equity", headerName: "Equity", flex: 0.7 },
  { field: "date", headerName: "Date", flex: 0.7 },
  { field: "time", headerName: "Time", flex: 0.7 },
];

const Transaction = ({
  transactions,
}: {
  transactions: stockTransactionsType[];
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
