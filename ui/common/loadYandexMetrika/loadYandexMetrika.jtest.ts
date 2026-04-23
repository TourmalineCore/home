import {
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { getCookie } from 'cookies-next';
import { loadYandexMetrika, optionYandexMetrika } from './loadYandexMetrika';

jest.mock(`cookies-next`, () => ({
  getCookie: jest.fn(),
}));

describe(`loadYandexMetrika`, () => {
  it(`
    GIVEN env METRICS_ENABLED = true and cookie accepted
    WHEN loadYandexMetrika is called
    SHOULD initialize yandex metrics with correct options
    `, () => {
    const yandexId = `99999999`;

    process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID = yandexId;
    process.env.NEXT_PUBLIC_METRICS_ENABLED = `true`;
    (getCookie as jest.Mock).mockReturnValue(`true`);

    // Create mock for document.head.appendChild
    const appendChildSpy = jest.spyOn(document.head, `appendChild`);

    loadYandexMetrika();

    // Check that two scripts have been added to the document head
    expect(appendChildSpy)
      .toHaveBeenCalledTimes(2);

    const secondScript = appendChildSpy.mock.calls[1][0] as any;

    // Check that yandex metrics init with correctly options
    expect(secondScript.textContent)
      .toContain(`window["ym"](${yandexId}, "init", ${JSON.stringify(optionYandexMetrika)}`);

    // Cleanup
    appendChildSpy.mockRestore();
    delete process.env.NEXT_PUBLIC_METRICS_ENABLED;
    delete process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
  });
});
