import "./modal.css";

const Modal = ({ closingText, handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>{closingText}</button>
      </section>
    </div>
  );
};

export default Modal;
