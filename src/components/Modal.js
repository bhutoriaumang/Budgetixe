import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: "5px",
  padding: "0 2vw 3vh",
};

export default function BasicModal({ showModal, handleClose, children }) {
  return (
    <div>
      <Modal open={showModal} onClose={handleClose}>
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}
