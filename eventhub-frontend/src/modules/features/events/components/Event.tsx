import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
    Avatar,
    Button,
    CircularProgress
} from '@mui/material';
import { useEvents } from "../hooks/use-events.hook";

const Event = () => {
    // Récupération des données et fonctions depuis ton hook Redux mis à jour
    const { events, isLoading, nextCursor, loadMore } = useEvents();

    return (
        <Box maxWidth="800px" mx="auto" py={4} px={2}>
            <Typography variant="h4" component="h1" gutterBottom>
                Liste d'évènements
            </Typography>
            
            <Box>
                {(!events || events.length === 0) && !isLoading ? (
                    <Typography variant="body1">Aucun évènement trouvé.</Typography>
                ) : (
                    events?.map((event) => (
                        <Card key={event.id} sx={{ mb: 2 }}>
                            <CardContent>
                                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                    <Avatar>{event.title.charAt(0)}</Avatar>
                                    <Typography variant="h6">{event.title}</Typography>
                                </Stack>
                                <Typography variant="body2" color="text.secondary" mb={1}>
                                    {event.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                )}

                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        mt: 6, 
                        mb: 4, 
                        gap: 2 
                    }}
                >
                    {isLoading && <CircularProgress />}

                    {!isLoading && nextCursor && (
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="large"
                            onClick={loadMore}
                        >
                            Charger plus d'évènements
                        </Button>
                    )}

                    {!isLoading && !nextCursor && events && events.length > 0 && (
                        <Typography variant="body2" color="text.secondary">
                            Vous avez vu tous les évènements !
                        </Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Event;