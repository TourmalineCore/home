export async function sendEmail({
  formData,
  token,
}: {
  formData: {
    email: string;
    name: string;
    description: string;
  };
  token: string;
}) {
  try {
    await fetch(`/api/send-email`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({
        to: process.env.NEXT_PUBLIC_TARGET_EMAIL,
        subject: `Discuss project`,
        message: `Email: ${formData.email}\nИмя: ${formData.name}\n\n${formData.description ? `Описание задачи:\n${formData.description}` : ``}`,
        html: `Email: ${formData.email}<br/>Имя: ${formData.name}<br/><br/>${formData.description ? `Описание задачи:<br/>${formData.description}` : ``}`,
        token,
      }),
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error || `Error`;
  }
}
