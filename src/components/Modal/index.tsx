import { FC, ReactNode, useState, useEffect, useRef } from "react";
import Portal from "components/Modal/Portal";
import Cross from "components/SVGs/Cross";

import "./Modal.scss";

interface IModalProps {
  children?: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  open: boolean;
}

const Modal: FC<IModalProps> = ({
  children,
  onClose,
  open: openProp,
  showCloseButton = true,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false); // Indicates intent to open modal
  const [show, setShow] = useState<boolean>(false); // Indicates MOdal is open
  const [modalElement, setModalElementRef] = useState<HTMLElement | null>(null);
  const prevScrollposition = useRef<number>(0);
  const scrollIsDisabled = useRef<boolean>(false);

  const disableScroll: () => void = () => {
    if (scrollIsDisabled.current) return;
    prevScrollposition.current = window.scrollY;
    const body: HTMLElement = document.body;
    body.style.position = "fixed";
    body.style.top = `-${prevScrollposition.current}px`;
    scrollIsDisabled.current = true;
  };

  const enableScroll: () => void = () => {
    if (!scrollIsDisabled.current) return;
    const body: HTMLElement = document.body;
    body.style.position = "";
    body.style.top = "";
    window.scrollTo(0, prevScrollposition.current);
    prevScrollposition.current = 0;
    scrollIsDisabled.current = false;
  };

  const handleClose = () => {
    setModalOpen(false);
    onClose?.();
  };

  useEffect(() => {
    if ((!show && modalOpen) || (!modalOpen && openProp)) {
      disableScroll();
      setShow(true);
      modalElement?.focus();
    } else if ((show && !modalOpen) || (modalOpen && !openProp)) {
      enableScroll();
      setShow(false);
    }
  }, [modalElement, modalOpen, openProp, show]);

  if (!show) return null;

  return (
    <Portal wrapperId="modal-wrapper">
      <div
        className="modal"
        role="dialog"
        tabIndex={0}
        ref={setModalElementRef}
      >
        {showCloseButton && (
          <button
            className="modal__close"
            onClick={handleClose}
            aria-label="Close"
          >
            <Cross />
          </button>
        )}
        {children}
      </div>
    </Portal>
  );
};

export default Modal;
