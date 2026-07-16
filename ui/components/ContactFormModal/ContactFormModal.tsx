import clsx from 'clsx';
import { Modal } from '../Modal/Modal';
import { ContactForm } from '../ContactForm/ContactForm';

export function ContactFormModal({
  onCloseModal,
  initializeIsSubmit = false,
  isComponentPage,
  isModalOpen,
}: {
  onCloseModal: () => void;
  initializeIsSubmit?: boolean;
  isComponentPage?: boolean;
  isModalOpen: boolean;
}) {
  return (
    <Modal
      className={clsx(`contact-form-modal`, {
        'contact-form-modal--open': isModalOpen,
      })}
      testId="contact-form-modal"
      onClose={onCloseModal}
    >
      <ContactForm
        isModal
        onCloseModal={onCloseModal}
        isComponentPage={isComponentPage}
        initializeIsSubmit={initializeIsSubmit}
      />
    </Modal>
  );
}
