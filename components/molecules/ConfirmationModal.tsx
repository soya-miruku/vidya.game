import { useDetectIsMobileView } from "@/hooks/useDetectIsMobileView";
import { Modal } from "../atoms/Modal";
import { VButton } from "../atoms/VButton";
import { VText } from "../atoms/VText";
import { VTitle } from "../atoms/VTitle";

export interface IConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModal = ({ onClose, onConfirm, title, description, confirmText='Leave', cancelText='Okay Boomer' }: IConfirmationModalProps) => {
  const { isMobileView } = useDetectIsMobileView();
  return (
    <Modal onClose={onClose} className="px-vsm">
      <div className="flex flex-col justify-center items-center dark:bg-dark-300 bg-light-200 rounded-xl sm:p-vxl p-vlrg drop-shadow-xl gap-vsm">
        <VTitle type={isMobileView ? 'h5' : 'h4'}>{title}</VTitle>
        <VText size="lg">{description}</VText>
        <div className="flex justify-between gap-x-vmd">
          <VButton primary animate={false} customColor='#FF4365' onClick={onConfirm}>{confirmText}</VButton>
          <VButton primary onClick={onClose}> {cancelText}
          </VButton>
        </div>
      </div>
    </Modal>
  )
}