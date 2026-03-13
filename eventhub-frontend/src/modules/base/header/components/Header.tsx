import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useProfile } from "../../../features/user/hooks/use-profile.hook";
import Link from "@mui/material/Link";

export const Header: React.FC = () => {
    const { profile } = useProfile();


    return (
        <AppBar position="static" elevation={1}>
        <Toolbar>
            <Typography
            variant="h6"
            component="div"
            sx={{
                fontWeight: 600,
                letterSpacing: 1,
                cursor: "pointer",
            }}
            >
            EventHub
            </Typography>

            <Box sx={{ flexGrow: 1 }} />




            {!profile ? (
                
                <Box sx={{ display: "flex", gap: 1 }}>
                <Link href="/login" color="inherit">
                Se connecter
                </Link>

                <Link href="/register" color="secondary">
                    S'inscrire
                </Link>
            </Box>

            ) : (

                <Box sx={{ display: "flex", gap: 1 }}>
                    <Link href="/" color="inherit">
                        Accueil
                    </Link>
                    <Link href="/events" color="inherit">
                        Événements
                    </Link>
                    <Link href="/dashboard" color="inherit">
                        Dashboard
                    </Link>
                    <Button color="inherit" variant="outlined">
                        <Link href="/logout" color="inherit">
                            Se déconnecter
                        </Link>
                    </Button>
                </Box>
    

            )}
        </Toolbar>
        </AppBar>
    );
};