export async function sendEmail(formData: {
  email: string;
  name: string;
  description: string;
}) {
  try {
    await fetch(`/api/sendEmail`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
      },
      body: JSON.stringify({
        to: process.env.NEXT_PUBLIC_TARGET_EMAIL,
        subject: `Discuss project`,
        message: `Email: ${formData.email}\nИмя: ${formData.name}\n\n${formData.description ? `Описание задачи:\n${formData.description}` : ``}`,
        html: `Email: ${formData.email}<br/>Имя: ${formData.name}<br/><br/>${formData.description ? `Описание задачи:<br/>${formData.description}` : ``}`,
      }),
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw error || `Error`;
  }
}
