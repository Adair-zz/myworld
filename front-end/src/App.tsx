import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import Navigation from "./scences/global/Navigation";
import Dashboard from "./scences/dashboard";
import Stock from "./scences/stock";
import StockNews from "./scences/stockNews";
import Balance from "./scences/balance";
import DemoTrading from "./scences/demoTrading";
import DemoTransactions from "./scences/demoTrading/demoTransactions";
import TransactionView from "./components/transaction/transactionView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/stock", element: <Stock /> },
      { path: "/stock-news", element: <StockNews /> },
      {
        path: "/balance",
        element: <Balance />,
      },
      {
        path: "/demo-trading",
        children: [
          {
            index: true,
            element: <DemoTrading />,
          },
          {
            path: "demo-transactions",
            element: <DemoTransactions />,
          },
          {
            path: "demo-transactions/:_id",
            element: <TransactionView />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
