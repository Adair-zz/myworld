import { Box, Typography, Divider } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import { tokens } from "../../../theme";
const TransactionHeader = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const HeaderTypography = styled(Typography)({
    color: colors.grey[200],
    fontSize: 17,
    fontweight: 10,
    width: "6%",
  });
  return (
    <Box
      sx={{
        position: "sticky",
        zIndex: 1,
        top: 10,
        backgroundColor: colors.primary[400],
      }}
    >
      <Box display={"flex"} margin={"10px 0 10px 10px"}>
        <HeaderTypography>Market</HeaderTypography>
        <HeaderTypography sx={{ width: "19%" }}>Company Name</HeaderTypography>
        <HeaderTypography>Symbol</HeaderTypography>
        <HeaderTypography sx={{ width: "4%" }}>Type</HeaderTypography>
        <HeaderTypography>Price</HeaderTypography>
        <HeaderTypography>Quantity</HeaderTypography>
        <HeaderTypography>Fee</HeaderTypography>
        <HeaderTypography>Amount</HeaderTypography>
        <HeaderTypography>TP Price</HeaderTypography>
        <HeaderTypography>SL Price</HeaderTypography>
        <HeaderTypography>Date</HeaderTypography>
        <HeaderTypography>time</HeaderTypography>
        <HeaderTypography sx={{ width: "16%" }}>Notes</HeaderTypography>
      </Box>
      <Divider sx={{ borderWidth: 2 }} />
    </Box>
  );
};

export default TransactionHeader;
