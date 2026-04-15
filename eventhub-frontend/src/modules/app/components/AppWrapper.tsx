import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { app } from "../main";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { Header } from "../../base/header/components/Header";
import { Hydrater } from "../../features/hydrater/components/Hydrater";

const theme = createTheme({
    palette: {
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Roboto", sans-serif',
    },
});

const globalStyles = (
    <GlobalStyles
        styles={{
        html: {
            width: '100%',
            height: '100%',
        },
        body: {
            margin: 0,
            padding: 0,
            width: '100%',
            minHeight: '100%',
            backgroundColor: '#f5f5f5'
        },
        '#root': {
            width: '100%',
            minHeight: '100%',
        }
        }}
    />
);

export const AppWrapper: React.FC<{ children: React.ReactNode }> =
    ({ children }) => {
        return (
            <Provider store={app.store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {globalStyles}
                    <Header />
                    <Hydrater>
                        {children}
                    </Hydrater>
                </ThemeProvider>
            </Provider>
        );
    };