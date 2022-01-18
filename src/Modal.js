import "./modal.css";

const Modal = ({ closingText, handleClose, show, setShowModal, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName} onClick={(e) => setShowModal(false)}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>{closingText}</button>
      </section>
    </div>
  );
};

export default Modal;
