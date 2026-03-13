import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useDashboardData } from "../hooks/use-dashboard-data";
// NOUVEAU : Imports MUI
import { Box, Typography, CircularProgress, Paper } from "@mui/material";

export const AnalyticsDashboard = () => {
    const { data, status, error } = useDashboardData();

    if (status === "loading") return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            {/* La couleur "#319795" correspond au teal.400 de Chakra et à tes barres */}
            <CircularProgress size={60} sx={{ color: "#319795" }} />
        </Box>
    );

    if (status === "error") return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <Typography color="error" fontSize="1.125rem">
                Erreur : {error}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{ maxWidth: '900px', mx: 'auto', py: 4, px: 2 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 1, fontWeight: 'bold' }}>
                Dashboard Analytics
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Pages les plus consultées par les utilisateurs
            </Typography>

            {data.length === 0 ? (
                <Paper variant="outlined" sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
                    <Typography color="text.secondary">
                        Aucune donnée analytics pour le moment. Naviguez entre les pages pour générer des évènements.
                    </Typography>
                </Paper>
            ) : (
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" tick={{ fontSize: 13 }} />
                            <YAxis allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0" }}
                                labelStyle={{ fontWeight: "bold" }}
                            />
                            <Bar dataKey="count" fill="#319795" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            )}
        </Box>
    );
};

export default AnalyticsDashboard;