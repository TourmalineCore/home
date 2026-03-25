# Cross-Origin Resource Sharing

## Status
Accepted

## Context
CORS (Cross-Origin Resource Sharing) is a browser mechanism that controls whether one website (domain) can make requests to resources on another website (domain). It is designed to protect users from potentially harmful actions when one site (possibly malicious) attempts to interact with another site.

## Decision
To enhance security and ensure predictable site behavior, we decided to configure CORS and security-related headers using the headers() method in next.config.js.

The following headers were added:

1. CORS Headers

- **Access-Control-Allow-Credentials: false** - Prevents the browser from sending cookies and other credentials in cross-origin requests. This reduces the risk of session information leakage when the site is accessed externally.

- **Access-Control-Allow-Origin: https://chelzoo.tech** - Restricts access to only the Origin: here it is https://chelzoo.tech, which in practice means that cross-origin requests from most websites are prohibited.

- **Cross-Origin-Opener-Policy: same-origin** - Isolates browsing contexts between windows and tabs with different origins, protecting against attacks.

2. Security Headers

- **X-Frame-Options: SAMEORIGIN** - Prevents the site from being displayed within an `<iframe>` from a different origin, thereby protecting against clickjacking attacks.

- **X-Content-Type-Options: nosniff** - Prevents the browser from attempting to guess the content type if the Content-Type header does not match. This helps prevent malicious code from being executed if it is misinterpreted by the browser.

- **Referrer-Policy: no-referrer** - Completely disables the sending of the Referrer header, ensuring maximum user privacy and preventing the leakage of URLs containing sensitive information.

- **Permissions-Policy: interest-cohort=(), camera=(), microphone=(), geolocation=(), fullscreen=(), payment=(), usb=(), accelerometer=(), display-capture=(), gyroscope=(), magnetometer=(), midi=(), picture-in-picture=(self), xr-spatial-tracking=()** - Restricts or completely disables access to many built-in browser APIs:
    - interest-cohort=() disables Google FLoC (Federated Learning of Cohorts).
    - Disabled: camera, microphone, geolocation, USB, accelerometer, display capture, etc.
    - Only picture-in-picture is allowed from the same origin (self), enabling the use of embedded video in floating mode.

These headers help enhance application security, limit external interference, minimize data leakage risks, and give developers full control over access policy.

## Alternatives
None considered.

## Consequences
Restricted access from other origins makes the application more secure by default.

## Pros
- Enhanced security (protection against clickjacking, MIME sniffing, side-channel attacks, and referrer leaks).
- Full control over access policy and isolation.
- Reduced risks associated with cross-origin requests.

## Cons
Potential compatibility issues may arise for users on older browsers that do not support some of these headers.

### Link to PR
https://github.com/TourmalineCore/pelican-ui/pull/303
