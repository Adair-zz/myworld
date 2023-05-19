import { Box, ButtonGroup, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const TradeTicket = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display={"flex"} justifyContent={"center"} m={"10px 5px 0 5px"}>
      <Box>
        <ButtonGroup>
          <Button
            variant="contained"
            sx={{
              width: "50%",
              backgroundColor: colors.greenAccent[700],
              color: "#FFFFFF",
            }}
          >
            Buy
          </Button>
          <Button
            variant="contained"
            sx={{ width: "50%", backgroundColor: colors.redAccent[700] }}
          >
            Sell
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default TradeTicket;
