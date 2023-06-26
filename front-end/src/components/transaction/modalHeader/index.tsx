import { Stack, Typography, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { tokens } from "../../../theme";
import { StockTransactionsType } from "../../../utils/interface";

const ModalHeader = ({
  transaction,
}: {
  transaction: StockTransactionsType;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={2}>
      <Typography variant="h2">{transaction.stock_symbol}</Typography>
      <Chip
        label={`${transaction.transaction_type}`}
        sx={{
          bgcolor:
            transaction.transaction_type === "buy"
              ? colors.greenAccent[600]
              : colors.redAccent[600],
          borderRadius: "5px",
        }}
        size={"small"}
      />
      <Typography>{transaction.date}</Typography>
      <Typography>{transaction.time}</Typography>
    </Stack>
  );
};

export default ModalHeader;
