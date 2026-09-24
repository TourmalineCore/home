import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { getCookie } from 'cookies-next';
import { loadYandexMetrika } from './loadYandexMetrika';

jest.mock(`cookies-next`, () => ({
  getCookie: jest.fn(),
}));

const OPTION_YANDEX_METRIKA = {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  defer: true,
};

describe(`loadYandexMetrika`, () => {
  const yandexId = `99999999`;
  let appendChildSpy: any;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID = yandexId;
    appendChildSpy = jest.spyOn(document.head, `appendChild`);
    (getCookie as jest.Mock).mockReset();
  });

  afterEach(() => {
    appendChildSpy.mockRestore();
    delete process.env.NEXT_PUBLIC_METRICS_ENABLED;
    delete process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  });

  it(`
    GIVEN env METRICS_ENABLED = true, cookie accepted and webvisor disabled
    WHEN loadYandexMetrika is called
    SHOULD initialize yandex metrics with correct options
    `, () => {
    process.env.NEXT_PUBLIC_METRICS_ENABLED = `true`;
    (getCookie as jest.Mock).mockReturnValue(`true`);

    loadYandexMetrika({
      webvisor: false,
    });

    // Check that two scripts have been added to the document head
    expect(appendChildSpy)
      .toHaveBeenCalledTimes(2);

    const secondScript = appendChildSpy.mock.calls[1][0] as any;

    // Check that yandex metrics init with correctly options
    expect(secondScript.textContent)
      .toContain(`window["ym"](${yandexId}, "init", ${JSON.stringify({
        ...OPTION_YANDEX_METRIKA,
        webvisor: false,
      })}`);
  });

  it(`
    GIVEN env METRICS_ENABLED = false and cookie accepted
    WHEN loadYandexMetrika is called
    SHOULD not initialize yandex metrics
    `, () => {
    process.env.NEXT_PUBLIC_METRICS_ENABLED = `false`;
    (getCookie as jest.Mock).mockReturnValue(`true`);

    loadYandexMetrika({
      webvisor: true,
    });

    // Check that two scripts are not added to the document head
    expect(appendChildSpy)
      .toHaveBeenCalledTimes(0);
  });

  it(`
    GIVEN env METRICS_ENABLED = true and cookie reject
    WHEN loadYandexMetrika is called
    SHOULD not initialize yandex metrics
    `, () => {
    process.env.NEXT_PUBLIC_METRICS_ENABLED = `true`;
    (getCookie as jest.Mock).mockReturnValue(`false`);

    loadYandexMetrika({
      webvisor: true,
    });

    // Check that two scripts are not added to the document head
    expect(appendChildSpy)
      .toHaveBeenCalledTimes(0);
  });

  it(`
    GIVEN env METRICS_ENABLED = true and cookie rejected
    WHEN loadYandexMetrika is called with isYandexIframe = true
    SHOULD initialize yandex metrics ignoring cookie
  `, () => {
    process.env.NEXT_PUBLIC_METRICS_ENABLED = `true`;
    (getCookie as jest.Mock).mockReturnValue(`false`);

    loadYandexMetrika({
      webvisor: true,
      isYandexIframe: true,
    });

    expect(appendChildSpy)
      .toHaveBeenCalledTimes(2);

    const secondScript = appendChildSpy.mock.calls[1][0] as any;
    expect(secondScript.textContent)
      .toContain(
        `window["ym"](${yandexId}, "init", ${JSON.stringify({
          ...OPTION_YANDEX_METRIKA,
          webvisor: true,
        })}`,
      );
  });

  it(`
    GIVEN env METRICS_ENABLED = false and cookie rejected
    WHEN loadYandexMetrika is called with isYandexIframe = true
    SHOULD not initialize yandex metrics
  `, () => {
    process.env.NEXT_PUBLIC_METRICS_ENABLED = `false`;
    (getCookie as jest.Mock).mockReturnValue(`false`);

    loadYandexMetrika({
      webvisor: true,
      isYandexIframe: true,
    });

    expect(appendChildSpy)
      .toHaveBeenCalledTimes(0);
  });
});
