import Image from 'next/image';
import { Modal } from '../../Modal/Modal';
import { useBodyScrollHidden } from '../../../common/hooks/useBodyScrollHidden';

// The same popup the site shows after its contact form is submitted (FormModal with the submitted FormRedesign),
// it reuses their markup and styles but has its own texts, because the original ones promise a reply by email
export function ZooMapSurveySubmittedModal({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  useBodyScrollHidden(true);

  return (
    <Modal
      className="form-modal form-modal--open"
      testId="zoo-map-survey-submitted-modal"
      onClose={onCloseModal}
    >
      <section className="form-block-redesign is-modal">
        <div className="form-block-redesign__wrapper container-redesign">
          <div className="form-block-redesign__inner">
            <div className="form-block-redesign__content">
              <div className="form-block-redesign__form-wrapper">
                <div className="form-redesign form-redesign--is-submitted is-modal">
                  <div className="form-redesign__img-container">
                    <Image
                      src="/images/submitted-form-image.png"
                      fill
                      alt=""
                    />
                  </div>
                  <h2 className="form-redesign__title">
                    Спасибо за ответы!
                  </h2>
                  <p className="form-redesign__description">
                    Они помогут нам сделать интерактивную карту зоопарка удобнее.
                  </p>
                  <div className="form-redesign__footer">
                    <button
                      className="form-redesign__featured-button"
                      type="button"
                      onClick={onCloseModal}
                    >
                      Вернуться к сайту
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
}
