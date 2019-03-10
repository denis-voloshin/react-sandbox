# React sandbox
![](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/3a4ik/react-sandbox/master/package.json&label=version&query=$.version&colorB=blue)

React sandbox with helpful libraries out of the box.

Also, it includes example of using redux and stylus.

## Installation
Install all required dependencies using
```
npm install
```

## Usage
`package.json` provides such commands:
- `npm run dev` - start [Webpack](https://webpack.js.org/) dev server
- `npm run build:dev` - create **development** build of `/src` folder to `/dist`
- `npm run build:prod` - create **production** build of `/src` folder to `/dist`
- `npm run serve:dev` - serve **development** build on 8080 port
- `npm run serve:prod` - serve **production** build on 8080 port

## Features
### Stylus support
You can write styles using [Stylus](http://stylus-lang.com/) preprocessor:
```stylus
.header
  padding 10px
  border-bottom 1px solid darken(#fff, 10%)
  &__text
    font-weight bold
    margin 10px
```
Then, you can include `.styl` file in your component by regular way or by module one:
```javascript
import './styles/app.styl';
import headerStyles from './styles/header.styl';
```
Style modules support regular and camelCased class names in your components.

### Module path aliasing
[Webpack](https://webpack.js.org/) allows you to import modules using aliases, instead of `../` hell:
```javascript
import * as userActions from '@Actions/userActions';
```
For now, allowed aliases are:
- **@Actions** - `/src/store/actions`
- **@Components** - `/src/components`
- **@Reducers** - `/src/store/reducers`
- **@Store** - `/src/store`
- **@Views** - `/src/views`
- **@Utils** - `/src/utils`

### Environment variables
You can set variables for your environment in `/config/env.js`, which is created from `/config/dist.env.js` template.

After that, you will be able to get these variables from `process.env`.

### Redux
Sandbox has [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) and preconfigured [Redux](https://redux.js.org/) store with basic user info - first name and last name.

You can configure your own store in `/src/store`.

### ESLint
Sandbox has [ESLing](https://eslint.org/) configuration in the root folder for [JSX](https://reactjs.org/docs/introducing-jsx.html) and vanilla [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) linting.
