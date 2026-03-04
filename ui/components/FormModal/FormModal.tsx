import clsx from 'clsx';
import { Modal } from '../Modal/Modal';
import { FormBlockRedesign } from '../redesign/FormBlockRedesign/FormBlockRedesign';

export function FormModal({
  onCloseModal,
  initializeIsSubmit,
  testId,
  isComponentPage,
  isModalOpen,
}:{
  onCloseModal: () => void;
  initializeIsSubmit?: boolean;
  testId?: string;
  isComponentPage?: boolean;
  isModalOpen: boolean;
}) {
  return (
    <Modal
      className={clsx(`form-modal`, {
        'form-modal--open': isModalOpen,
      })}
      testId={testId}
      onClose={onCloseModal}
    >
      <FormBlockRedesign
        isModal
        initializeIsSubmit={initializeIsSubmit}
        onCloseModal={onCloseModal}
        isComponentPage={isComponentPage}
      />
    </Modal>
  );
}
