import "./modal.css";
import { useCallback, useEffect } from "react";

const Modal = ({ closingText, handleClose, show, setShowModal, children }) => {
  const escFunction = useCallback(
    (event) => {
      if (event.keyCode === 27) {
        setShowModal(false);
      }
    },
    [setShowModal]
  );

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const handleClick = (e) => {
    if (e.target === e.currentTarget) setShowModal(false);
  };
  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);

  return (
    <div
      className={showHideClassName}
      onClick={handleClick}
      onKeyPress={handleClick}
    >
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>{closingText}</button>
      </section>
    </div>
  );
};

export default Modal;
