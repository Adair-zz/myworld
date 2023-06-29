import { ChangeEvent } from "react";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { tokens } from "../../../theme";

const StyledTextField = ({
  value,
  onChange,
}: {
  value: number | undefined;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div>
      <TextField
        value={value}
        onChange={onChange}
        type="number"
        label="Quantity"
        variant="standard"
        required
        //   autoFocus
        sx={{
          ".Mui-focused": {
            color: colors.grey[100],
          },
          ".MuiFormLabel-root": {
            color: colors.grey[100],
          },
        }}
      />
    </div>
  );
};
export default StyledTextField;
