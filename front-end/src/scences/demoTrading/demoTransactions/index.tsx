import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { tokens } from "../../../theme";
import { RootState, AppDispatch } from "../../../store/store";
import { fetchDemoTransactions } from "../../../store/stockTransactionsSlice";
import Header from "../../../components/header";
import Transaction from "../../../components/transaction";

const DemoTransactions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDemoTransactions());
  }, []);

  const demoTransactions = useSelector(
    (state: RootState) => state.stockTransactions.demo_transactions
  );

  return (
    <Box m={"0 10px 0 10px"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header
          title={"DEMO TRANSACTIONS"}
          subtitle={"Learn from Your Records"}
          titleVariant={"h2"}
          subtitleVariant={"h5"}
        />
      </Box>

      <Box
        sx={{ backgroundColor: colors.primary[400], margin: "0 5px 0 0" }}
        overflow={"auto"}
      >
        <Transaction transactions={demoTransactions} />
      </Box>
    </Box>
  );
};

export default DemoTransactions;