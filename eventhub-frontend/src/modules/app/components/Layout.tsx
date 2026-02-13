import { Container } from "@mui/material";

export const Layout: React.FC <{children: React.ReactNode}> = ({children}) => {

    return (
        <>
            <Container>
                {children}
            </Container>
        </>
    )
}