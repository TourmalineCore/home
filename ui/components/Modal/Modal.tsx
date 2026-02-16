import { ReactNode, useEffect, useRef } from 'react';
import FocusLock from 'react-focus-lock';
import { useRouter } from 'next/router';
import IconCross from '../../icons/cross.svg';
import { useOnClickOutside } from '../../common/hooks';

export function Modal({
  children,
  onClose = () => {},
  testId,
}: {
  children: ReactNode;
  onClose?:() => unknown;
  testId?: string;
}) {
  const {
    locale,
  } = useRouter();

  useEffect(() => {
    function escFunction(event: KeyboardEvent) {
      if (event.key === `Escape`) {
        onClose();
      }
    }

    document.addEventListener(`keydown`, escFunction, false);

    return () => {
      document.removeEventListener(`keydown`, escFunction, false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refModal = useRef<HTMLDivElement>(null);

  useOnClickOutside(refModal, onClose);

  return (
    <FocusLock
      whiteList={(node) => node.title !== `SmartCaptcha advanced widget`}
      returnFocus
    >
      <div
        className="default-scroll modal"
        data-testid={testId}
      >
        <div className="modal__container">
          <div
            className="modal__inner"
            ref={refModal}
          >
            <button
              type="button"
              className="modal__cross"
              onClick={onClose}
              aria-label={
                locale === `ru`
                  ? `Закрыть модальное окно с формой`
                  : `Close modal window with form`
              }
            >
              <IconCross />
            </button>
            <div className="modal__content">{children}</div>
          </div>
        </div>
      </div>
    </FocusLock>
  );
}
