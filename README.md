This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

---

# Commands used:

### Create our application:

npx create-react-app learnstorybook-design-system<br/>
cd learnstorybook-design-system

### Create a new repository on Github and give him this name

learnstorybook-design-system

### Add the remote to your git repo and push the repo

git remote add origin https://github.com/AlexAxis/learnstorybook-design-system.git<br/>
git push -u origin master

### Delete src and download pre-made components (using svn (Subversion) to download a folder of files from Github)

rm -rf src<br/>
svn export https://github.com/chromaui/learnstorybook-design-system/tags/download-1/src

### Add dependencies

yarn add prop-types styled-components polished

### Download design tokens to the repository

svn export https://github.com/chromaui/learnstorybook-design-system/tags/download-2/src/shared src/shared

### Add Prettier (a consistent syntax and standardize formatting)

yarn add --dev prettier

### Add Storybook (“Storybook is a powerful frontend workshop environment tool that allows teams to design, build, and organize UI components (and even full screens!) without getting tripped up over business logic and plumbing.” – Brad Frost, Author of Atomic Design))

npx -p @storybook/cli sb init<br/>
yarn storybook

### Add addon Storysource (shows the currently selected story code in the addon panel so that we can copy/paste it)

yarn add --dev @storybook/addon-storysource<br/>
(insert in the .storybook/main.js -> "@storybook/addon-storysource",)

### Add addon Knobs (allows to edit the properties via the UI)

yarn add --dev @storybook/addon-knobs<br/>
(insert in the .storybook/main.js -> '@storybook/addon-knobs',)

### Connect to CircleCI

(Add a .circleci directory at the top level and create a config.yml file inside of it.)
version: 2
jobs:
build:
docker: - image: circleci/node:10.13
working_directory: ~/repo
steps: - checkout - restore_cache:
keys: - v1-dependencies-{{ checksum "package.json" }} - v1-dependencies- - run: yarn install - save_cache:
paths: - node_modules
key: v1-dependencies-{{ checksum "package.json" }} - run: yarn test
