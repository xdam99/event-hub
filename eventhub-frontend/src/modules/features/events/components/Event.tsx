import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
    Avatar,
    Pagination,
    CircularProgress,
} from '@mui/material';
import { useEvents }  from "../hooks/use-events.hook";

const Event = () => {
    const { events, isLoading, currentPage, totalPages, goToPage } = useEvents();

    return (
        <Box maxWidth="800px" mx="auto" py={4} px={2}>
            <Typography variant="h4" component="h1" gutterBottom>Liste d'évènements</Typography>
            
            <Box>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" my={4}>
                        <CircularProgress />
                    </Box>
                ) : 
                !events || events.length === 0 ? (
                    <Typography variant="body1">Aucun évènement trouvé.</Typography>
                ) : (
                    events.map((event) => (
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

                {!isLoading && totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(_, page) => goToPage(page)}
                            color="primary"
                            size="large"
                            showFirstButton
                            showLastButton
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Event