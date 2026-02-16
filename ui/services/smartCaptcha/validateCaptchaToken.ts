export async function validateCaptchaToken(
  token: string,
) {
  try {
    const response = await fetch(`/api/validateCaptchaToken`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({
        token,
      }),
    });

    return await response.json();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error || `Error`;
  }
}
