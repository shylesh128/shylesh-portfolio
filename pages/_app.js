import "../styles/globals.css";
import { BusinessContextProvider } from "../services/businessContext";
import { CookiesProvider } from "react-cookie";
import { Layout } from "../components/layout/Layout.component";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#390778",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <BusinessContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BusinessContextProvider>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default MyApp;
