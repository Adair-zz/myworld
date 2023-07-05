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
  CardActions,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { tokens } from "../../../theme";
import { addTransactionNotes } from "../../../utils/demoTradingController";
import TestImage from "../../../test.png";

const ModalBody = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [notesInfo, setNotesInfo] = useState<{
    _id: string;
    image: File | null;
    notes: string;
  }>({
    _id: "648cb835e8a9d929aa0ccffa",
    image: null,
    notes: "",
  });

  const handleImageModal = () => {
    setImageModalOpen(!imageModalOpen);
  };

  const handleImageFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setNotesInfo((prevState) => ({ ...prevState, image: fileList[0] }));
    }
  };

  const handleNotesTextInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newNotes = event.target.value;
    setNotesInfo((prevState) => ({ ...prevState, notes: newNotes }));
  };

  const submitTransactionNotes = async () => {
    await addTransactionNotes(notesInfo);
  };

  console.log(notesInfo.image);
  if (notesInfo.image) {
    console.log(URL.createObjectURL(notesInfo.image));
  }

  const notes =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum magnam, magni facere corrupti voluptates sapiente rem eius sed sunt similique quaerat culpa amet odit, dignissimos, maxime voluptate! In, quam ipsa!";

  return (
    <Box p={"20px 20px 10px 10px"}>
      {TestImage !== null && notes !== undefined ? (
        <Card
          sx={{ display: "flex", minHeight: "350px" }}
          style={{ backgroundColor: colors.primary[500] }}
        >
          <Box
            sx={{
              width: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: `2px dashed ${colors.grey[100]}`,
              borderRadius: "8px",
              boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            {notesInfo.image === null ? (
              <input
                accept="image/*"
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleImageFileUpload}
              />
            ) : (
              <img
                src={URL.createObjectURL(notesInfo.image)}
                alt={`${notesInfo.image.name}`}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </Box>
          <Box
            sx={{
              width: "40%",
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
              <TextField
                value={notesInfo.notes}
                multiline
                rows={3}
                label="Enter the reason why you buy this stock"
                sx={{
                  width: "350px",
                  ".Mui-focused": { color: colors.grey[100] },
                  ".MuiFormLabel-root": { color: colors.grey[100] },
                }}
                onChange={handleNotesTextInput}
              />
            </CardContent>
            <CardActions
              sx={{ justifyContent: "flex-end", p: "50px 50px 0 0" }}
            >
              <form
                onSubmit={submitTransactionNotes}
                encType="multipart/form-data"
              >
                <Button
                  size="large"
                  variant="contained"
                  onClick={submitTransactionNotes}
                  sx={{
                    backgroundColor: colors.greenAccent[600],
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: colors.greenAccent[700],
                    },
                    "&:action": {
                      backgroundColor: colors.greenAccent[800],
                    },
                  }}
                >
                  Submit
                </Button>
              </form>
            </CardActions>
          </Box>
        </Card>
      ) : (
        <Card
          sx={{ display: "flex" }}
          style={{ backgroundColor: colors.primary[600] }}
        >
          <CardMedia
            component={"img"}
            image={TestImage}
            alt="Missing Image"
            sx={{ width: "60%" }}
            onClick={handleImageModal}
          />
          <Modal
            open={imageModalOpen}
            onClose={handleImageModal}
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
                onClick={handleImageModal}
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
              <Typography>{notes}</Typography>
            </CardContent>
            <CardActions
              sx={{ justifyContent: "flex-end", p: "50px 50px 0 0" }}
            >
              <Button
                size="large"
                variant="contained"
                sx={{
                  backgroundColor: colors.redAccent[600],
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: colors.redAccent[700],
                  },
                  "&:action": {
                    backgroundColor: colors.redAccent[800],
                  },
                }}
              >
                Update
              </Button>
            </CardActions>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default ModalBody;
