This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Prerequisite

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Project Details

This Finance Management App is an offline first finance management app. all local data recorded using sqlite.

![Preview](/docs/preview.png)

## Step 1: Clone and run metro server

- clone project

```bash
git clone https://github.com/sipamungkas/finance-management-app.git
```

- install dependencies

```bash
yarn install
```

for ios

```bash
npx pod-install
```

or

```bash
cd ios && pod install && cd ..
```

- run project and metro bundler

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

## Dependency

| package | version |
| ------- | ------- |
| @react-navigation/native" | "^7.0.14", |
| @react-navigation/native-stack" | "^7.2.0", |
| @react-navigation/stack" | "^7.1.1", |
| lucide-react-native" | "^0.471.0", |
| react" | "18.2.0", |
| react-native" | "0.72.4", |
| react-native-element-dropdown" | "^2.12.4", |
| react-native-safe-area-context" | "^5.1.0", |
| react-native-screens" | "^4.5.0", |
| react-native-sqlite-storage" | "^6.0.1", |
| react-native-svg" | "^15.11.1", |
| react-native-vector-icons" | "^10.2.0", |
| zustand" | "^5.0.3" |
