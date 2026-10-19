/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from 'nativewind';
import { useEffect, useLayoutEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './global.css';
import AppNavigationContainer from './src/navigation/AppNavigationContainer';
import { persistor, store } from './src/redux-store/store';
import { CreateNotifeeChannel } from './src/utils/notification';
import { ToastConfigComponents } from './src/utils/toastConfig';

const queryClient = new QueryClient();
function App() {
  const { setColorScheme } = useColorScheme();

  useLayoutEffect(() => {
    const handleSetTheme = async () => {
      const theme = (await AsyncStorage.getItem('theme')) as
        | 'light'
        | 'dark'
        | null;

      setColorScheme(theme || 'light');
    };

    handleSetTheme();
  }, []);

  useEffect(() => {
    CreateNotifeeChannel();
  }, []);

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate persistor={persistor}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
                  <AppNavigationContainer />
                </SafeAreaView>
              </SafeAreaProvider>
              <Toast config={ToastConfigComponents} />
            </GestureHandlerRootView>
          </PersistGate>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
