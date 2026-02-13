import { CssBaseline, Container } from "@mui/material";

export const Layout: React.FC <{children: React.ReactNode}> = ({children}) => {

    return (
        <>
            <CssBaseline />
            {/* <Toolbar sx={({borderBottom: 1, borderBottomColor: 'divider'})}>
            </Toolbar> */}
            <Container maxWidth="lg" sx={({ mt: 0})}>
                {children}
            </Container>
        </>
    )
}