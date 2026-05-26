import { useState } from "react";

const IS_SMARTCAPTCHA_ENABLED = process.env.NEXT_PUBLIC_ENABLE_SMARTCAPTCHA === `true`;

export function useSmartCaptcha() {
  const [isSmartCaptchaVisible, setIsSmartCaptchaVisible] = useState<boolean>(false);
  // It is needed to recreate a captcha, because if a captcha has been sent once, its lifecycle ends.
  // This allows you to use the captcha multiple times without reloading the page.
  const [smartCaptchaKey, setSmartCaptchaKey] = useState(0);

  const resetSmartCaptcha = () => {
    setIsSmartCaptchaVisible(false);
    setSmartCaptchaKey((prev) => prev + 1);
  };

  return {
    isSmartCaptchaEnabled: IS_SMARTCAPTCHA_ENABLED,
    isSmartCaptchaVisible,
    smartCaptchaKey,
    showSmartCaptcha: () => setIsSmartCaptchaVisible(true),
    hideSmartCaptcha: () => setIsSmartCaptchaVisible(false),
    resetSmartCaptcha,
  };
}
