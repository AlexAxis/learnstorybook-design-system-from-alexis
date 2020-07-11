# The Learn Storybook design system

The Learn Storybook design system is a subset of the full [Storybook design system](https://github.com/storybookjs/design-system/), created as a learning resource for those interested in learning how to write and publish a design system using best in practice techniques.

Learn more at [Learn Storybook](https://learnstorybook.com).

---

# Commands used:

### Create our application:

```bash
npx create-react-app learnstorybook-design-system
cd learnstorybook-design-system
```

### Create a new repository on Github and give him this name

learnstorybook-design-system

### Add the remote to your git repo and push the repo

```bash
git remote add origin https://github.com/AlexAxis/learnstorybook-design-system.git
git push -u origin master
```

### Delete src and download pre-made components (using svn (Subversion) to download a folder of files from Github)

```bash
rm -rf src
svn export https://github.com/chromaui/learnstorybook-design-system/tags/download-1/src
```

### Add dependencies

```bash
yarn add prop-types styled-components polished
```

### Download design tokens to the repository

```bash
svn export https://github.com/chromaui/learnstorybook-design-system/tags/download-2/src/shared src/shared
```

### Add Prettier (a consistent syntax and standardize formatting)

```bash
yarn add --dev prettier
```

### Add Storybook (“Storybook is a powerful frontend workshop environment tool that allows teams to design, build, and organize UI components (and even full screens!) without getting tripped up over business logic and plumbing.” – Brad Frost, Author of Atomic Design))

```bash
npx -p @storybook/cli sb init
yarn storybook
```

### Add addon Storysource (shows the currently selected story code in the addon panel so that we can copy/paste it)

```bash
yarn add --dev @storybook/addon-storysource
```

insert in the .storybook/main.js ->

```js
"@storybook/addon-storysource",
```

### Add addon Knobs (allows to edit the properties via the UI)

```bash
yarn add --dev @storybook/addon-knobs
```

insert in the .storybook/main.js ->

```js
'@storybook/addon-knobs',
```

### Connect to CircleCI (Continous Integration to test your code before a git push)

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

### Connect to Netlify (deploy)

Build command: yarn storybook-build<br/>
Publish directory: storybook-static

### add the storybook-static directory to our .gitignore file

storybook-static

### Git commands

(-a Tell the command to automatically stage files that have been modified and deleted, but new files you have not told Git about are not affected)<br/>
(-m Use the given message as the commit message)<br/>
(but it didn't work: "with -a does not make sense")<br/>

```bash
git commit -am “ignore storybook static”
git checkout -b improve-button
git commit -am “make Button pop”
git push -u origin improve-button
```

### Add addon Accessibility (a tool for verifying web accessibility standards (WCAG) in realtime.)

```bash
yarn add --dev @storybook/addon-a11y
```

insert in the .storybook/main.js ->

```js
"@storybook/addon-a11y",
```

insert decorator in the .storybook/preview.js ->

```js
import { withA11y } from "@storybook/addon-a11y";
addDecorator(withA11y);
)
```

### Add addon Docs (Generate documentation. It mostly checks the propTypes that are on the component)

```bash
yarn add --dev @storybook/addon-docs
```

insert in the .storybook/main.js ->

```js
{
    name: '@storybook/addon-docs',
    options: {
    configureJSX: true,
    },
},)
```

### Extending documentation (with some human touch: "why, when and how" for other developers)

write in the src/Avatar.stories.js ->

```js
export default {
  title: "Design System|Avatar",

  parameters: {
    component: Avatar,
    componentSubtitle: "Displays an image that represents a user or organization",
  },
}
```

and now write in the src/Avatar.js -><br/>
"CHECK ALL THE BIG COMMENTS THAT ARE WRITTEN IN THAT FILE"<br/>
and now write in the src/Avatar.stories.js ->

```js
sizes.story = {
  parameters: { docs: { storyDescription: "4 sizes are supported." } },
}
```

### Supercharge documentation with Markdown/MDX (I DON'T LIKE THIS)

change in the .storybook/main.js ->

```js
stories: ['../src/**/*.stories.(js|mdx)'],
```

create src/Avatar.stories.mdx -> <br/>
(copy paste from here http://localhost:9009/?path=/docs/design-system-avatar--sizes)

### Publishing only the Docks from Storybook

insert in the package.json -> <br/>

```js
{
    "scripts": {
    "build-storybook-docs": "build-storybook -s public --docs"
    }
}
```

(now go to Netlify and publish to deploy the docs site)

### Git branch (-b means that he creates that new branch)

```bash
git checkout -b distribute
```

# DISTRIBUTE -----------------------------------------------------

(create the src/index.js)

### Add a development dependency on @babel/cli and cross-env to compile our JavaScript for release

```bash
yarn add --dev @babel/cli cross-env
```

### Add script

```js
{
    "scripts": {
    "build": "cross-env BABEL_ENV=production babel src -d dist",

}
    "babel": {
        "presets": [
        "react-app"
        ]
    }
}
```

### Run the build

```bash
yarn build
```

### Add to .gitignore

storybook-static<br/>
dist

### Adding package metadata for publication (changes to package.json)

```bash
yarn init
```

yarn init v1.16.0
question name (learnstorybook-design-system):
question version (0.1.0):
question description (Learn Storybook design system):
question entry point (dist/index.js):
question repository url (https://github.com/chromaui/learnstorybook-design-system.git):
question author (Tom Coleman <tom@thesnail.org>):
question license (MIT):
question private: no

### Release management with Auto (To publish releases to npm, we’ll use a process that also updates a changelog describing changes, sets a sensible version number, and creates git tag linking that version number to a commit in our repository.)

```bash
yarn add --dev auto
```

### Getting a GitHub and npm token

https://github.com/settings/tokens<br/>
(check the "repo" scope)<br/>
https://www.npmjs.com/settings/alexaxis/tokens<br/>
(“Read and Publish” permissions)<br/>
(create file .env and add the tokens)<br/>
(add the .env to the gitignore)

### Create labels on GitHub (we use Auto to label the version of the package)

```bash
yarn auto create-labels
```

(this was the feedback in the console:
Created labels: major, minor, patch, skip-release, internal, documentation, tests, dependencies, performance

You can see these, and more at https://github.com/AlexAxis/learnstorybook-design-system/labels)<br/>
(We should tag all future PRs with one of the labels,before merging them)

### Publish our first release with Auto manually

(In the future, we’ll calculate new version numbers with auto via scripts, but for the first release, let’s run the commands manually to understand what they do.)<br/>

```bash
yarn auto changelog
```

(This will generate a long changelog entry with every commit we’ve created so far (and a warning we’ve been pushing to master, which we should stop doing soon).)<br/>
(Although it is useful to have an auto-generated changelog so you don’t miss things, it’s also a good idea to manually edit it and craft the message in the most useful way for users. In this case, the users don’t need to know about all the commits along the way. Let’s make a nice simple message for our first v0.1.0 version. First undo the commit that Auto just created (but keep the changes:)<br/>

```bash
git reset HEAD^
```

(update the changelog and commit it:)

```bash
git add CHANGELOG.md
git commit -m "Changelog for v0.1.0 [skip ci]"
```

### Now we can publish: (FINALLY!)

```bash
npm version 0.1.0 -m "Bump version to: %s [skip ci]"
npm publish
```

(And use Auto to create a release on GitHub:)

```bash
git push --follow-tags origin master
yarn auto release
```

(Yay! We’ve successfully published our package to npm and created a release on GitHub (with luck!).)<br/>

### Set up scripts to use Auto (follow the rest of this tutorial in here: https://www.learnstorybook.com/design-systems-for-developers/react/en/distribute/)

(this following info I didn't do it yet)<br/>
(Let’s set up Auto to follow the same process when we want to publish the package in the future.)<br/>
change package.json ->

```js
{
  "scripts": {
    "release": "auto shipit"
  }
}
```

Now, when we run `yarn release`, we’ll step through all the steps we ran above (except using the auto-generated changelog) in an automated fashion. We’ll ensure that all commits to master are published by adding a command to our circle config:

```txt
# ...
- run: yarn test
- run: npx chromatic --project-token=2wix88i1ziu
- run: |
    if [ $CIRCLE_BRANCH = "master" ]
    then
      yarn release
    fi
```

We’ll also need to add an npm+GitHub token to your project’s Circle environment on the CircleCI website (https://circleci.com/gh/AlexAxis/learnstorybook-design-system/edit#env-vars):<br/>
Now every time you merge a PR to master, it will automatically publish a new version, incrementing the version number as appropriate due to the labels you’ve added.<br/>
(more Auto features: https://github.com/intuit/auto)

### Then we import the Design System into our app

# EXTRA:

-> How many commits does the project have?

```bash
git shortlog -sn
```

### Some modifications in package.json

yarn add --dev babel-plugin-transform-es2015-modules-umd
yarn add --dev babel-core
yarn add --dev babel-preset-es2015
yarn add --dev babel-preset-react
yarn add --dev babel-preset-stage-2
yarn add --dev babel-polyfill
yarn add --dev babel-eslint

"babel": {
"presets": [
"react-app"
]
},

"@babel/cli": "^7.10.1",
