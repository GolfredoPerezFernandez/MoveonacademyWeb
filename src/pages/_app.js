import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from '../theme/index';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
const clientSideEmotionCache = createEmotionCache();
import { MoralisProvider } from "react-moralis";



const REACT_APP_SERVER_URL = 'http://localhost:1337/server'
const REACT_APP_APPLICATION_ID = "001"

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();
  return (   <MoralisProvider
    serverUrl={REACT_APP_SERVER_URL }
    appId={REACT_APP_APPLICATION_ID }
  >
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          MoveOnAcademy
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthConsumer>
              {
                (auth) => auth.isLoading
                  ? <SplashScreen />
                  : getLayout(<Component {...pageProps} />)
              }
            </AuthConsumer>
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </CacheProvider>
    </MoralisProvider>
  );
};

export default App;
