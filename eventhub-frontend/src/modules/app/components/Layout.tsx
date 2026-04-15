import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTrackPageView } from "../../features/analytics/hooks/use-track-page-view.hook";

export const Layout: React.FC <{children: React.ReactNode}> = ({children}) => {

    const location = useLocation();
    useTrackPageView(location.pathname);

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {children}
            </Container>
        </>
    )
}