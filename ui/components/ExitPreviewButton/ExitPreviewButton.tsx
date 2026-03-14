import { useRouter } from "next/router";

export function ExitPreviewButton() {
  const router = useRouter();

  const handleExit = async () => {
    await fetch(`/api/exit-preview`, {
      method: `POST`,
    });
    router.reload();
  };

  return (
    <button
      type="button"
      className="exit-preview-button"
      onClick={handleExit}
    >
      {router.locale === `ru` ? `Выйти из режима черновика` : `Exit preview mode`}
    </button>
  );
}
