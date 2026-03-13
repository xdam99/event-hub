import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
    Avatar,
} from '@mui/material';
import useEvents  from "../hooks/use-events.hook";

const Event = () => {
    const hook = useEvents();

    return (
        <Box maxWidth="800px" mx="auto" py={4} px={2}>
            <Typography variant="h4" component="h1" gutterBottom>Liste d'évènements</Typography>
            <Box>
                {hook.events.length === 0 ? (
                    <Typography variant="body1">Aucun évènement trouvé.</Typography>
                ) : (
                    hook.events.map((event) => (
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
            </Box>
        </Box>



    );
};

export default Event