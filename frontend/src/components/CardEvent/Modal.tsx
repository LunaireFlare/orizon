import { FC, ReactNode, MouseEvent } from "react";
import "./Modal.scss";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modalEvent" onClick={handleBackgroundClick}>
            <div className="modalContent">
                <span className="close" onClick={onClose}>X</span>
                {children}
            </div>
        </div>
    )
};

export default Modal;
