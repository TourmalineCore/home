import { useRouter } from "next/router";
import { AppRoute } from "../../common/enums";

export function CustomError({
  statusCode,
  message,
}: {
  statusCode: 500 | 404;
  message: string;
}) {
  const {
    locale,
    replace,
  } = useRouter();

  return (
    <section
      className="custom-error container-redesign"
      data-testid="custom-error"
    >
      <div className="custom-error__wrapper">
        <h1 className="custom-error__title">{statusCode}</h1>
        <p className="custom-error__message">{message}</p>
        <button
          className="custom-error__button"
          type="button"
          onClick={() => replace(AppRoute.Main)}
        >
          {locale === `ru` ? `На главную` : `Go home`}
        </button>
      </div>
    </section>
  );
}
