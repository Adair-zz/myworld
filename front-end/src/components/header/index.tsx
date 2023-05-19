import { Typography, Box, useTheme, TypographyProps } from "@mui/material";
import { tokens } from "../../theme";

type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface HeaderType {
  title: string;
  subtitle?: string;
  titleVariant: HeadingVariant;
  subtitleVariant?: HeadingVariant;
  isAlign?: Boolean;
}

const Header = ({
  title,
  subtitle,
  titleVariant,
  subtitleVariant,
  isAlign,
}: HeaderType) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const variantMapping: TypographyProps["variantMapping"] = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
  };

  return (
    <Box
      mb={"15px"}
      sx={isAlign ? { display: "flex", alignItems: "flex-end" } : {}}
    >
      <Typography
        variant={titleVariant}
        color={colors.grey[100]}
        fontWeight={"bold"}
        sx={{ mr: "5px" }}
        variantMapping={variantMapping}
      >
        {title}
      </Typography>
      <Typography variant={subtitleVariant} color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
