/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import AppProvider from './src/utils/AppProvider';

const AppContainer = () => (
    <AppProvider>
        <App />
    </AppProvider>
)

AppRegistry.registerComponent(appName, () => AppContainer);
