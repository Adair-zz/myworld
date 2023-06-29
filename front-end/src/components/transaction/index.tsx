import { useState } from "react";
import { Box, Typography, Button, Modal, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CancelOutlined } from "@mui/icons-material";

import { tokens } from "../../theme";
import { StockTransactionsType } from "../../utils/interface";
import TransactionHeader from "./transactionHeader";
import ModalHeader from "./modalHeader";
import ModalBody from "./modalBody";

const Transaction = ({
  transactions,
}: {
  transactions: StockTransactionsType[];
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Box m={"5px 0 0 5px"}>
      <TransactionHeader />

      <Box margin={"10px 0 0 10px"}>
        {transactions != null &&
          transactions.map((transaction) => {
            const {
              market,
              company_name,
              stock_symbol,
              transaction_type,
              stock_value,
              quantity,
              brokerage_fee,
              total_amount,
              tp_price,
              sl_price,
              date,
              time,
              _id,
            } = transaction;
            return (
              <Box
                key={_id}
                display={"flex"}
                height={"35px"}
                overflow={"hidden"}
                color={colors.grey[100]}
              >
                <Typography width={"6%"}>{market}</Typography>
                <Box width={"19%"}>
                  <Typography
                    sx={{
                      width: "90%",
                      overflow: "auto",
                      whiteSpace: "nowrap",
                      overflowY: "hidden",
                    }}
                  >
                    {company_name}
                  </Typography>
                </Box>
                <Typography width={"6%"}>{stock_symbol}</Typography>
                <Typography width={"4%"}>{transaction_type}</Typography>
                <Typography width={"6%"}>{stock_value}</Typography>
                <Typography width={"6%"}>{quantity}</Typography>
                <Typography width={"6%"}>{brokerage_fee}</Typography>
                <Typography width={"6%"}>{total_amount}</Typography>
                <Typography width={"6%"}>{tp_price}</Typography>
                <Typography width={"6%"}>{sl_price}</Typography>
                <Typography width={"6%"}>{date}</Typography>
                <Typography width={"6%"}>{time}</Typography>
                <Box
                  width={"16%"}
                  display={"flex"}
                  gap={"7%"}
                  justifyContent={"flex-start"}
                  alignContent={"center"}
                >
                  <Typography
                    sx={{
                      width: "60%",
                      overflow: "auto",
                      whiteSpace: "nowrap",
                      overflowY: "hidden",
                    }}
                  >
                    {_id}
                  </Typography>
                  <Button
                    onClick={handleModal}
                    variant="contained"
                    sx={{
                      bgcolor: colors.greenAccent[600],
                      width: "20%",
                      height: "60%",
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: colors.greenAccent[700],
                      },
                      "&:active": {
                        backgroundColor: colors.greenAccent[800],
                      },
                    }}
                  >
                    View
                  </Button>
                  <Modal
                    open={modalOpen}
                    onClose={() => handleModal()}
                    sx={{
                      ".MuiModal-backdrop": {
                        backgroundColor: "transparent",
                      },
                      backdropFilter: "blur(0.35px)",
                    }}
                    key={_id}
                  >
                    <Box
                      sx={{
                        position: "absolute" as "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "80%",
                        height: "70%",
                        backgroundColor: colors.primary[500],
                        borderRadius: "15px",
                        p: "20px 50px 10px 50px",
                      }}
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <ModalHeader transaction={transaction} />

                        <IconButton onClick={() => handleModal()}>
                          <CancelOutlined fontSize="large" />
                        </IconButton>
                      </Box>

                      <ModalBody />
                    </Box>
                  </Modal>
                </Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default Transaction;
