import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
// 🌟 Import du bon hook
import { useEventById } from '../hooks/use-event-by-id.hook';

export default function EventById() {
    const { id } = useParams<{ id: string }>();

    // 🌟 Utilisation du bon hook
    const { event, isLoading, error } = useEventById(id);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress size={60} sx={{ color: "#319795" }} />
            </Box>
        );
    }

    if (error || !event) {
        return (
            <Box sx={{ textAlign: 'center', py: 10 }}>
                <Typography variant="h5" color="error">
                    {typeof error === 'string' ? error : "Événement introuvable"}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h3" gutterBottom>
                {event.title}
            </Typography>
            <Typography variant="body1" paragraph>
                {event.description}
            </Typography>
            <Typography variant="h6" color="primary">
                Prix : {event.price} €
            </Typography>
            
            {/* Ton futur bouton d'ajout au panier */}
        </Box>
    );
}