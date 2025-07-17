import {
  Modal,
  ModalButtonPanel,
  ModalTitle,
  Button
} from "@admiral-ds/react-ui";
import styled from "styled-components";
interface ConfirmModalProps {
  mobile?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const CustomModal = styled(Modal)`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const ConfirmModal = ({
  mobile = false,
  onClose,
  onConfirm
}: ConfirmModalProps) => {
  return (
    <CustomModal mobile={mobile}>
      <ModalTitle>Подтверждение</ModalTitle>
      Вы действительно хотите удалить эту задачу?
      <ModalButtonPanel>
        <Button appearance="primary" dimension="xl" onClick={onConfirm}>
          Удалить
        </Button>
        <Button appearance="secondary" dimension="xl" onClick={onClose}>
          Отмена
        </Button>
      </ModalButtonPanel>
    </CustomModal>
  );
};

export default ConfirmModal;
