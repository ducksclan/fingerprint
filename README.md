# fingerprint

Passive fingerprinting for express.

## Getting started

You need to install this module as a dependency of your nodejs project with any
package manager.

```bash
$ npm install @ducksclan/fingerprint
```

`or`

```bash
$ yarn add @ducksclan/fingerprint
```

## Usage

```typescript
import fingerprint, { IpInfo } from '@ducksclan/fingerprint';

app.use(fingerprint());

app.get('/my/fingerprint', (req, res) => {
  res.send(req.fingerprint); // hashed string of length 32
});

app.get('/my/ip-info', (req, res) => {
  res.send(req.ipInfo); // instance of IpInfo
});
```

## Links

- [ducks.clan.app@gmail.com](mailto:ducks.clan.app@gmail.com)
- [github repository](https://github.com/ducksclan/fingerprint)
- [npm package](https://npmjs.com/package/@ducksclan/fingerprint)
