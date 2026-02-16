export type OptionYM = {
  clickmap: boolean;
  trackLinks: boolean;
  accurateTrackBounce: boolean;
  webvisor: boolean;
};

declare global {
  interface Window {
    ym: (id: number, operationName: string, option: OptionYM | string) => unknown;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (operationName: string, ...arg: any) => unknown;
  }
}
