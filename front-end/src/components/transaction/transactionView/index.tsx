import { useState, ChangeEvent } from "react";
import {
  Box,
  Stack,
  Typography,
  Chip,
  Divider,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Modal,
  TextField,
  Input,
  FormControl,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { tokens } from "../../../theme";
import { addTransactionNotes } from "../../../utils/demoTradingController";
import TestImage from "../../../test.png";

const TransactionView = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { _id } = useParams();

  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const handleImageModal = () => {
    setImageModalOpen(!imageModalOpen);
  };
  const transaction = {
    brokerage_fee: 500,
    company_name:
      "Alibaba Group Holding Limited American Depositary Shares each representing eight Ordinary share",
    date: "5/6/2023",
    market: "NASDAQ",
    quantity: 10000,
    sl_price: 10000,
    stock_symbol: "BABA",
    stock_value: 10000,
    time: "17:23:13",
    total_amount: 6000,
    tp_price: 10000,
    transaction_type: "buy",
    _id: "648cb702e8a9d929aa0ccff3",
    image: null,
    notes:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum magnam,",
  };

  return (
    <Box
      m={"0 10px 0 10px"}
      bgcolor={colors.primary[400]}
      p={"20px 20px 20px 20px"}
    >
      <ViewHeader transaction={transaction} />

      {transaction.image == null || transaction.notes == null ? (
        <NotesForm />
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
              backdropFilter: "blur(1px)",
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
              <Typography>{transaction.notes}</Typography>
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

const NotesForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [notesInfo, setNotesInfo] = useState<{
    _id: string;
    image: File | null;
    notes: string;
  }>({
    _id: "648cb835e8a9d929aa0ccffa",
    image: null,
    notes: "",
  });

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
    const notes: { [key: string]: any } = new FormData();
    notes.append("_id", notesInfo._id);
    notes.append("notes", notesInfo.notes);
    notes.append("image", notesInfo.image);
    await addTransactionNotes(notes);
  };

  const resetNotesInfo = () => {
    setNotesInfo((prevState) => ({ ...prevState, notes: "", image: null }));
  };

  return (
    <Box height={"490px"}>
      <form onSubmit={submitTransactionNotes} encType="multipart/form-data">
        <Box
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"center"}
        >
          <FormControl fullWidth>
            {notesInfo.image == null ? (
              <Box m="0 auto">
                <Input
                  id="image-upload"
                  type="file"
                  inputProps={{ accept: "image/*" }}
                  onChange={handleImageFileUpload}
                />
              </Box>
            ) : (
              <img
                src={URL.createObjectURL(notesInfo.image)}
                alt={`${notesInfo.image.name}`}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </FormControl>
          <Stack sx={{ width: "80%", m: "0 0 30px 30px" }}>
            <FormControl>
              <TextField
                value={notesInfo.notes}
                multiline
                rows={3}
                label="Enter the reason why you buy this stock"
                sx={{
                  width: "350px",
                  ".Mui-focused": { color: colors.grey[100] },
                  ".MuiFormLabel-root": { color: colors.grey[100] },
                  m: "0 0 40px 0",
                }}
                onChange={handleNotesTextInput}
              />
            </FormControl>
            <Stack direction="row" spacing={2}>
              <Button
                size="large"
                variant="contained"
                onClick={resetNotesInfo}
                sx={{
                  width: "20%",
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
                reset
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={submitTransactionNotes}
                sx={{
                  width: "30%",
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
            </Stack>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

const ViewHeader = ({ transaction }: { transaction: any }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box p={"0 10px 80px 10px"}>
      <Stack
        direction={"row"}
        display={"flex"}
        alignItems={"flex-end"}
        spacing={6}
      >
        <Stack spacing={1}>
          <Typography variant="h6">{transaction.market}</Typography>
          <Typography variant="h2">{transaction.stock_symbol}</Typography>
        </Stack>
        <Box p={"0 0 5px 0"}>
          <Chip
            label={`${transaction.transaction_type}`}
            sx={{
              bgcolor:
                transaction.transaction_type === "buy"
                  ? colors.greenAccent[600]
                  : colors.redAccent[600],
              borderRadius: "5px",
            }}
            size={"medium"}
          />
        </Box>
        <Stack spacing={1} alignItems={"center"}>
          <Typography variant={"h6"}>Stock Value</Typography>
          <Typography variant={"h2"}>{transaction.stock_value}</Typography>
        </Stack>
        <Stack spacing={1} alignItems={"center"}>
          <Typography variant={"h6"}>Quantity</Typography>
          <Typography variant={"h2"}>{transaction.quantity}</Typography>
        </Stack>
        <Stack spacing={1} alignItems={"center"}>
          <Typography variant={"h6"}>Fee</Typography>
          <Typography variant={"h2"}>{transaction.brokerage_fee}</Typography>
        </Stack>
        <Stack spacing={1} alignItems={"center"}>
          <Typography variant={"h6"}>Total Amount</Typography>
          <Typography variant={"h2"}>{transaction.total_amount}</Typography>
        </Stack>
        <Stack spacing={1} alignItems={"center"}>
          <Typography variant={"h6"}>TP Price</Typography>
          <Typography variant={"h2"}>{transaction.tp_price}</Typography>
        </Stack>
        <Stack spacing={1} alignItems={"center"}>
          <Typography variant={"h6"}>SL Price</Typography>
          <Typography variant={"h2"}>{transaction.sl_price}</Typography>
        </Stack>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ borderWidth: 2 }}
        />
        <Stack spacing={1} sx={{ padding: "0 0 7px 0" }}>
          <Typography variant={"h5"}>{transaction.date}</Typography>
          <Typography variant={"h5"}>{transaction.time}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TransactionView;
