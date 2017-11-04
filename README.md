![](docs/logo.png)
# ElasticDev Starter Kit === ESK

> *Elastic, Serverless, Universal... oh my! 💫*
>
> ESK is a toolkit for **universal**, **serverless**, GraphQL **schema-first**, **immutable**, 
**reactive**, **functional** and **progressive** applications using
> **React as a platform** at its core.

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release) 
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) 
[![AirBnb style](https://img.shields.io/badge/code%20style-airbnb-green.svg?style=flat-square)](https://github.com/airbnb/javascript) 
[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
![Platforms](https://img.shields.io/badge/platform-web%20%7C%20ssr%20%7C%20ios%20%7C%20android-lightgrey.svg?style=flat-square)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

A starter kit for quickly developing universal applications powered by React, GraphQL, functional, 
serverless, and reactive concepts. Includes web, mobile and desktop platforms, with more to come.

ESK reduces boilerplate to the absolute minimum, and thrives to make application development 
simpler by encapsulating common constructs, patterns, models and relationships common to most apps.

This "incidental" architecture that we build just in order to get our business feature
development going is minimized, letting you focus on the core values of your application.
Project setup and configuration, authentication, payments, search, social features, among others,
are handled for you and ready to be extended to accommodate your application requirements.

## Why you shouldn't use this

It's not common for projects to include an anti-pitch, but in the interest of transparency,
we thought it would help you evaluate whether to use (or contribute to) this project. You're always welcome to help, and we will be removing these points accordingly if we
feel we've made significant process and there are no longer relevant, we might be
adding some too.

* 🔥 This project is *really* unstable and on the earliest phases you can think of.
* 💥 This project is *very* ambitious, we might not complete everything there's to it ¯\_(ツ)_/¯.
* 💦 This project is *very* opinionated, a plugin architecture is in our roadmap, but
for now the technology and pattern choices made will probably have to resonate with you
in order to be used effectively.
* 👀 Tooling across the ecosystem is not there yet, so we have patches all over the place.
* 👎 If serverless isn't for you or your organization.
* 🙉 If you're not building universal apps.
* 😾 If you're looking for something simple. We'll simplify our API and usage when we're 
closing in on **1.0**.

## Built With

* [React](https://facebook.github.io/react/)
* [React Native](https://facebook.github.io/react-native)
* [GraphQL](http://graphql.org)
* [Apollo Client](http://dev.apollodata.com/)
* [Redux](http://redux.js.org/)
* [Redux Observable](https://redux-observable.js.org/)
* [Glamorous](https://glamorous.rocks/)
* [React Primitives](https://github.com/lelandrichardson/react-primitives)
* [Webpack](https://webpack.js.org/)
* [Electron](https://electron.atom.io/)
* [Serverless Framework](https://serverless.com/)
* [AWS Lambda](https://aws.amazon.com/lambda/)

TODO: List other main libraries, frameworks used including versions.

## Developing

### Prerequisites

* Install [NodeJS](https://nodejs.org)
* Install [Yarn](https://yarnpkg.com/en/docs/install)

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/blackxored/elasticdev-starter-kit.git
cd elasticdev-starter-kit/
yarn bootstrap
```

### Create an environment file

In the root of the repository, create a `.env` file with contents ressembling
the following:

```shell
APP_NAME=Your Application Name
API_URL=https://your.serverless.graphql.api.endpoint/graphql
AUTH_SERVICE_URL=https://your.serverless.auth.service.url
FACEBOOK_APP_ID=YOUR_FACEBOOK_APP_ID
```

You can use the provided values if they were given to you (internal development),
otherwise edit accordingly. Your GraphQL endpoint could be `http://localhost:3000/graphql`
in development (with GraphiQL at `http://localhost:3000/graphiql`), while you could use 
AWS Lambda in production (Lambda handler with `apollo-server-lambda` coming soon). The authentication service, however,
it's serverless-only so you'll need to deploy that first:

```shell
yarn global add serverless
cd services/auth
serverless deploy
```

Notice the endpoint URL given to you and put that as `AUTH_SERVICE_URL` up to
the stage.

### Start development
```shell
yarn start
```

This will start a local GraphQL server, React Native packager 
(using [Haul](https://github.com/callstack-io/haul)), and in the future more scripts.

### Deploying / Publishing

In the future:
```shell
yarn deploy
```

TODO: give more detailed instructions on how to build and release a new version
In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [link to tags on this repository](/tags).

## Configuration

Configuration, as briefly described above, is done through environment variables. 
In development, we loada `.env` file from the project's root. 
Here all all valid configuration options:

```
APP_NAME=Your Application Name
API_URL=https://your.serverless.graphql.api.endpoint/graphql
AUTH_SERVICE_URL=https://your.serverless.auth.service.url
FACEBOOK_APP_ID=YOUR_FACEBOOK_APP_ID
```

## Tests

```shell
yarn test
```

## Style guide

We use most of [AirBnB's style guide](https://github.com/airbnb/javascript) and we check with [ESLint](http://eslint.org)
and automatically format our code with [Prettier](https://github.com/prettier/prettier).

## API Reference

TODO: Link to deployed GraphiQL, Documentation.js generated docs, etc.

## Database

In a true serverless fashion, we use [FaunaDB](https://fauna.com/) as our primary 
data store.

## Licensing

MIT. See License file.

## Contributing

If you're interested in contributing to this project in any form, please read
our [Contribution Guidelines](https://github.com/blackxored/elasticdev-starter-kit/blob/master/CONTRIBUTING.md).

### Code of Conduct

We've adopted a Code of Conduct that we expect project participants to adhere to.
Please read the [full text](https://github.com/blackxored/elasticdev-starter-kit/blob/master/CODE_OF_CONDUCT.md)
so that you can understand what actions will and will not be tolerated.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars3.githubusercontent.com/u/133308?v=4" width="100px;"/><br /><sub>Adrian Perez</sub>](http://adrianperez.codes)<br />[💻](https://github.com/blackxored/elasticdev-starter-kit/commits?author=blackxored "Code") [📖](https://github.com/blackxored/elasticdev-starter-kit/commits?author=blackxored "Documentation") [🚇](#infra-blackxored "Infrastructure (Hosting, Build-Tools, etc)") [🎨](#design-blackxored "Design") [👀](#review-blackxored "Reviewed Pull Requests") [🤔](#ideas-blackxored "Ideas, Planning, & Feedback") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
