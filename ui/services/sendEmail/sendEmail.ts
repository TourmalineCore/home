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
  const response = await fetch(`/api/send-email`, {
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

  if (!response.ok) {
    throw new Error(`Failed to send email`);
  }
}
