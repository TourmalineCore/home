# 002: Ensuring Secure Data Processing in Forms When Handling Personal Data in Russia.

## Status
Accepted

## Accepted
It is necessary to ensure secure data processing in forms when handling personal data, in compliance with legal requirements and to protect the system from automated attacks. The form should only be displayed to users from Russia.

## Decision
### Personal Data Processing
1. Explicit consent for personal data processing is required, with a checkbox placed next to the text:
"I consent to the processing of my personal data ...".
2. The consent checkbox must not be pre-checked automatically.
3. The form must not be submitted without the consent checkbox checked.
4. A link to the document containing the privacy policy and personal data processing terms must be present.

Pros:
- Transparency and compliance with legal requirements
- Clear proof of obtained consent 

### Protection Against Automated Attacks (Yandex SmartCaptcha)
Architectural solution:

![alt text](./images/captcha-schema.png)

1. After successful captcha completion, the client calls `/api/validateCaptcha` with the `token` parameter, which is generated automatically after the captcha is completed.
2. Inside `/api/validateCaptcha`, an endpoint on the Yandex side https://smartcaptcha.yandexcloud.net/validate is called with the `token` and `secret` parameters (secret can be obtained from the personal account and must be added to `.env` as it is a secret) to validate the submitted `token`.
3. After validation, if the `token` is valid, `{ status: 'ok' }` is returned; otherwise, `{ "status": "failed" }` is returned.

Specific features:
1. The token is one-time use, so if you try to submit multiple forms with the same token, you will receive an error indicating that the token has already been used.

Yandex SmartCaptcha provides a comprehensive guide on creating and adding captcha to a website, which can be found [here](https://yandex.cloud/ru/docs/smartcaptcha/quickstart#node_1)

>The guide above provides an example for vanilla JS only. In the personal account of the Yandex SmartCaptcha service, there is a code example for React. To access it, you need to click the "Connect" button in the top right corner.

![alt text](./images/location-of-the-connect-button.png)

Pros:
- Reduces automated bot attacks

Cons:
- Requires users to perform additional actions to submit the form

## Sending Emails
We use mail.ru SMTP, more detailed setup instructions can be found [here](https://help.mail.ru/mail/login/mailer/#setup).

Architectural solution:

![alt text](./images/send-email.png)

1. After filling out the form and completing the captcha, the client calls `/api/sendEmail`, which accepts the following parameters:

```js
 {
    to: 'targetEmail',
    subject: `yourSubject`,
    message: `yourMessage`,
    html: 'html',
 }
```

2. Inside this endpoint, the [Nodemailer](https://nodemailer.com/) library is used, which provides methods for creating a `transporter` with the following parameters:

```js
 {
    host: `smtp.mail.ru`,
    port: 465,
    secure: true,
    auth: {
       user: yourEmail,
       pass: yourServicePassword,
    },
 }
```

3. `The transporter.sendEmail()` method is called, which sends the message to the specified email address (the `to` parameter).

Pros:
- Free
- Easy to configure

## Displaying Form Only to Users from Russia
Because the form uses Russian services for captcha and sending messages, it should only be displayed to users from Russia.

For this, the standard JS tool [Geolocation API](https://developer.mozilla.org/ru/docs/Web/API/Geolocation_API/Using_the_Geolocation_API)is used. It allows you to obtain the user's coordinates, but to determine the user's country, these coordinates need to be geocoded. For this purpose, the [coordinate_to_country](https://www.npmjs.com/package/coordinate_to_country) package is used.
