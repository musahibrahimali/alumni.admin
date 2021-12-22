import React from 'react';
import { createTheme } from '@mui/material';
import { Footer } from "../components";
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useSelector } from "react-redux";

// Create a client
const queryClient = new QueryClient();

const Layout = (props) => {
    /* props */
    const { children } = props;
    /* data layer */
    const theme = useSelector((state) => state.theme.theme);

    /* material ui theme */
    const appTheme = createTheme({
        palette: {
            mode: theme ? "dark" : "light", // toggle light and dark theme
            ...(!theme
                ? {
                    // palette values for light mode

                }
                : {
                    // palette values for dark mode
                    c_dark: {
                        main: '#0A1929',
                    },
                    custom_paper: {
                        main: '#121212',
                    }
                }),
        },
    });

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={appTheme}>
                    <div className={theme ? "dark" : ""}>
                        {/* children (page content) */}
                        <div className="bg-white dark:bg-dark-color-900">
                            {children}
                        </div>

                        {/* main footer */}
                        <div>
                            <Footer />
                        </div>
                    </div>
                </ThemeProvider>

                {/* query dev tools */}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}

export default Layout;
