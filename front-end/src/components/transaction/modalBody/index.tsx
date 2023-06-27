import { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Modal,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { tokens } from "../../../theme";
import TestImage from "../../../test.png";
const ModalBody = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

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
          {/* <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              height: "80%",
              bgcolor: colors.primary[500],
              borderRadius: "15px",
              p: "20px 50px 10px 50px",
              m: "0 auto",
            }}
          >
            <img
              src="https://picsum.photos/700/450.jpg"
              alt={"temp"}
              onClick={handleModal}
            />
          </Box> */}
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
            <Typography>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
              magnam, magni facere corrupti voluptates sapiente rem eius sed
              sunt similique quaerat culpa amet odit, dignissimos, maxime
              voluptate! In, quam ipsa!
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default ModalBody;
