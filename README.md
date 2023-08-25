# How to run

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

# Libraries Used

[@react-native-async-storage/async-storage](@react-native-async-storage/async-storage) for store data in locally.
[moment](https://www.npmjs.com/package/moment) for format data into desire format.

### Below all Dependencies for Navigation
[@react-navigation/bottom-tabs](https://www.npmjs.com/package/@react-navigation/bottom-tabs)   
[@react-navigation/native](https://www.npmjs.com/package/@react-navigation/native)   
[@react-navigation/stack](https://www.npmjs.com/package/@react-navigation/stack)

# A screenshot/gif of what was made

![demo](https://github.com/eric-huang7/firekamp-assessment/assets/85207830/73853e4c-d3cb-4781-bd22-188cb7b5dc0f)

# What would i do if i had more time
1. Saved Location Screen - Save multiple location data 
2. Show multiple location data in swiperview
