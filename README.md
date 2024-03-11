# kw-employees-portal

An employees portal that fetches employees from random api. Uses ReactJS with typescript and tailwind css using UI toolkit material-tailwind

I have used [Create React App](https://github.com/facebook/create-react-app). to bootstrap this project

## Pre-requisites

* Make sure you have latest version of nodejs installed on your system (https://nodejs.org/en/download/)
* Any code editor, I prefer using VScode

## Installation

```bash
$ npm install
```

## Run the app

```npm start```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Create a build 

```npm run build```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


## Project Structure takeaways

* All application code resides in /src directory
* 'src/components' have separate files for each component of application
* 'src/constants' have a constant file that contain overall application constants
* 'src/service' contains APIs called using Axios.
* 'src/styles' have tailwind.css which is not quite used in this project, since material-tailwind UI toolkit does all the styling
* 'src/types' have user type defined 

## Notes and thought process

* I have tried to make project structure simple and self explanatory, so that it can provide a clear sense of the direction
* I have tried to fullfil all the requirements that were listed in coding challenge, but there is always room for improvement
* Listing component is very large and I understand that it can be split into smaller components which will increase readablity and reusability of code. Due to limited time and the fact that this is a coding challenge that wouldn't be used later, I am ignoring it.
* I have used params to pass selected user object from parent (Listing) to child component (UserProfile). I understand this is not the best approach and redux store should be used here, but due to limited time, I choose this method of implementation
* Gender select dropdown has some minor CSS issue
* Unit tests are missing but we can use Jest testing framework
* File naming conventions are used throughout the project and are made consistent everywhere
* Overall I have put my efforts in this coding challenge and would love to hear feedback about it :) 

