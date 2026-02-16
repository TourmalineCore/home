import { Modal } from '../Modal/Modal';
import { FormBlockRedesign } from '../redesign/FormBlockRedesign/FormBlockRedesign';

export function FormModal({
  setIsOpen,
  initializeIsSubmit,
  testId,
  isComponentPage,
}:{
  setIsOpen: (isOpen: boolean) => void;
  initializeIsSubmit?: boolean;
  testId?: string;
  isComponentPage?: boolean;
}) {
  return (
    <Modal
      testId={testId}
      onClose={onClose}
    >
      <FormBlockRedesign
        isModal
        initializeIsSubmit={initializeIsSubmit}
        onCloseModal={onClose}
        isComponentPage={isComponentPage}
      />
    </Modal>
  );

  function onClose() {
    setIsOpen(false);
  }
}
