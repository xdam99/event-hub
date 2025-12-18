import type React from "react";
import { CssBaseline, Toolbar, Typography } from "@mui/material";
import Container from "@mui/material/Container";

export const Layout: React.FC<{children: React.ReactNode}> = ({
    children
}) => {
    return (
        <>
            <CssBaseline />
            <Toolbar sx={{borderBottom: 1, borderColor: "divider"}}>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}></Typography>
                    Eventhub
            </Toolbar>
            <Container maxWidth="md" sx={{mt: 4}}>
                {children}
            </Container>
        </>
    )
}