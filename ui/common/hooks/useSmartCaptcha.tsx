import { useState } from "react";
import { validateCaptchaToken } from "../../services/smartCaptcha/validateCaptchaToken";

const IS_SMARTCAPTCHA_ENABLED = process.env.NEXT_PUBLIC_ENABLE_SMARTCAPTCHA === `true`;

export function useSmartCaptcha({
  onSuccess,
}: {
  onSuccess: () => void | Promise<void>;
}) {
  const [isSmartCaptchaVisible, setIsSmartCaptchaVisible] = useState<boolean>(false);
  // It is needed to recreate a captcha, because if a captcha has been sent once, its lifecycle ends.
  // This allows you to use the captcha multiple times without reloading the page.
  const [smartCaptchaKey, setSmartCaptchaKey] = useState(0);

  const handleCaptchaSuccess = async (captchaToken: string) => {
    try {
      const response = await validateCaptchaToken(captchaToken);

      if (response.status === `ok`) {
        await onSuccess();
      }
    } finally {
      setIsSmartCaptchaVisible(false);
      setSmartCaptchaKey((prev) => prev + 1);
    }
  };

  return {
    isSmartCaptchaEnabled: IS_SMARTCAPTCHA_ENABLED,
    isSmartCaptchaVisible,
    smartCaptchaKey,
    showSmartCaptcha: () => setIsSmartCaptchaVisible(true),
    hideSmartCaptcha: () => setIsSmartCaptchaVisible(false),
    handleCaptchaSuccess,
  };
}
