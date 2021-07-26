## Getting Started

#### View Contact Form

- install packages - `yarn`
- start dev server - `yarn dev`
- open browser to [localhost](http://localhost:3000)

### Configure 'Backend'

- head over to [SendGrid](https://sendgrid.com/), make an account and complete the 4-step process to be able to send emails.
- create and fill in a `.env.local` file and restart the server

```js
// .env.local example
SENDGRID_API_KEY = string;
EMAIL_FROM = string; // ex) submissions@yourwebsite.com
EMAIL_TO = string; // ex) contact@yourwebsite.coms
```

> Note: There's two sender methods available on SendGrid: Domain Authentication and Single Sender Verification. **This example uses Single Sender.** (I don't have a domain laying around to test this, sorry). Feel free to switch up the methods, if you want.
