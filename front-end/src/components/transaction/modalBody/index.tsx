import { useState, ChangeEvent } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { tokens } from "../../../theme";
import TestImage from "../../../test.png";

const ModalBody = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [str, setStr] = useState<string>("");
  console.log(str);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const notes: string =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum magnam, magni facere corrupti voluptates sapiente rem eius sed sunt similique quaerat culpa amet odit, dignissimos, maxime voluptate! In, quam ipsa!";

  return (
    <Box p={"20px 20px 10px 10px"}>
      <Card
        sx={{ display: "flex" }}
        style={{ backgroundColor: colors.primary[600] }}
      >
        <CardMedia
          component={"img"}
          image={TestImage}
          alt="Missing Image"
          sx={{ width: "60%" }}
          onClick={handleModal}
        />
        <Modal
          open={modalOpen}
          onClose={handleModal}
          sx={{
            ".MuiModal-backdrop": {
              bgcolor: "transparent",
            },
            backdropFilter: "blur(0.35px)",
          }}
        >
          <Card
            sx={{
              width: "90%",
              height: "90%",
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CardMedia
              component={"img"}
              image={TestImage}
              alt={"Missing Image"}
              onClick={handleModal}
            />
          </Card>
        </Modal>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "10px 0 10px 20px",
          }}
        >
          <CardHeader
            title="Notes"
            sx={{
              ".MuiCardHeader-title": {
                fontSize: 25,
              },
            }}
          />
          <CardContent>
            {notes !== undefined ? (
              <TextField
                value={str}
                multiline
                rows={3}
                label="Enter the reason why you buy this stock"
                sx={{
                  width: "350px",
                  ".Mui-focused": {
                    color: colors.grey[100],
                  },
                  ".MuiFormLabel-root": {
                    color: colors.grey[100],
                  },
                }}
                onChange={(
                  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                ) => {
                  setStr(event.target.value);
                }}
              />
            ) : (
              <Typography>{notes}</Typography>
            )}
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default ModalBody;
