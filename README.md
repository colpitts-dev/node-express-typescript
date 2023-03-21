# Node + Express + TypeScript Starter

Open Source Node Express app written in TypeScript

### Minimal project setup includes

- `tsc` for type checking and `babel` for transpiling TS to JavaScript for
  distribution.
- `eslint` and `prettier` for checking formatting and linting

<br/>

## Getting Started

Clone the repo, and have the following installed and ready to go

### Prereqs

- Node 18.14.2
- Yarn 1.22.19

With the repo cloned, copy the sample env config and update with your env config

```bash
$ cp .env.sample .env     # copy sample env conig
$ vim .env                # edit with your config
$ yarn                    # install deps
$ yarn dev                # run dev mode
```

### Available commands

```bash
$ yarn validate   # checks overal health of code
$ yarn build      # builds the code for production
$ yarn dev        # run the code in development mode
$ yarn start      # runs the code in production mode
```
