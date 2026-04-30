export const POLICY_VERSION = process.env.NEXT_PUBLIC_POLICY_VERSION;

export const COOKIE_ACCEPT = `cookieAccept-${POLICY_VERSION}`;

export const COOKIE_SETTINGS = `cookieSettings-${POLICY_VERSION}`;

export const GENERAL_COOKIE_OPTIONS = {
  // 1 year
  maxAge: 365 * 24 * 3600,
};
