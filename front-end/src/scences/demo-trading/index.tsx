import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/header";
import TradeTicket from "../../components/trade-ticket";
import Transaction from "../../components/transaction";

const DemoTrading = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m={"0 10px 0 10px"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header
          title={"DEMO TRADING"}
          subtitle={"Improve Your Skills"}
          titleVariant={"h2"}
          subtitleVariant={"h5"}
        />
      </Box>

      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(12, 1fr)"}
        gridAutoRows={"100px"}
      >
        <Box
          gridColumn={"span 8"}
          gridRow={"span 3"}
          sx={{
            backgroundColor: colors.primary[400],
            margin: "0 5px 5px 0",
          }}
        ></Box>
        <Box
          gridColumn={"span 4"}
          gridRow={"span 6"}
          sx={{ backgroundColor: colors.primary[400] }}
          overflow={"auto"}
        >
          <TradeTicket />
        </Box>
        <Box
          gridColumn={"span 8"}
          gridRow={"span 3"}
          sx={{ backgroundColor: colors.primary[400], margin: "0 5px 0 0" }}
          overflow={"auto"}
        >
          {/* <Transaction /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default DemoTrading;
