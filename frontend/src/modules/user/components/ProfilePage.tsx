// import React from 'react';
// import {
//     Box,
//     Button,
//     Typography,
//     Alert,
//     CircularProgress,
//     Paper,
//     Divider,
//     Skeleton,
//     Chip,
// } from '@mui/material';
// import { useProfile } from '../hooks/useProfile';
// import { TwoFactorModal } from './TwoFactorModal';

// export const ProfilePage: React.FC = () => {
//     const {
//         profile,
//         isLoading,
//         error,
//         isOtpLoading,
//         otpError,
//         showTwoFactorModal,
//         handleOpenTwoFactor,
//         handleCloseTwoFactor,
//     } = useProfile();

//     // Displaying initial loading state
//     if (isLoading) {
//         return (
//             <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3 }}>
//                 <Typography variant="h4" component="h1" gutterBottom>
//                     Mon Profil
//                 </Typography>
//                 <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
//                 <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
//                 <Skeleton variant="rectangular" height={60} />
//             </Box>
//         );
//     }

//     return (
//         <>
//             <Paper sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3 }}>
//                 <Typography variant="h4" component="h1" gutterBottom>
//                     Mon Profil
//                 </Typography>

//                 <Divider sx={{ mb: 3 }} />

//                 {error && (
//                     <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
//                 )}

//                 {profile && (
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                         <Box>
//                             <Typography variant="caption" color="text.secondary">Nom d'utilisateur</Typography>
//                             <Typography variant="body1">{profile.username}</Typography>
//                         </Box>

//                         <Box>
//                             <Typography variant="caption" color="text.secondary">Email</Typography>
//                             <Typography variant="body1">{profile.email}</Typography>
//                         </Box>

//                         <Box>
//                             <Typography variant="caption" color="text.secondary">Membre depuis</Typography>
//                             <Typography variant="body1">
//                                 {new Date(profile.createdAt).toLocaleDateString('fr-FR')}
//                             </Typography>
//                         </Box>

//                         <Divider sx={{ my: 2 }} />

//                         {/* Section 2FA */}
//                         <Typography variant="h6">Authentification à deux facteurs (2FA)</Typography>

//                         {otpError && (
//                             <Alert severity="error">{otpError}</Alert>
//                         )}

//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <Typography variant="body2">
//                                 Statut :
//                             </Typography>
//                             <Chip
//                                 label={profile.otp_enable === 1 ? 'Activé' : 'Désactivé'}
//                                 color={profile.otp_enable === 1 ? 'success' : 'default'}
//                                 size="small"
//                             />
//                         </Box>

//                         {profile.otp_enable === 1 ? (
//                             <Button
//                                 variant="outlined"
//                                 color="error"
//                                 onClick={() => handleOpenTwoFactor()}
//                                 disabled={isOtpLoading}
//                             >
//                                 {isOtpLoading ? (
//                                     <CircularProgress size={24} color="inherit" />
//                                 ) : (
//                                     'Désactiver le 2FA'
//                                 )}
//                             </Button>
//                         ) : (
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={handleOpenTwoFactor}
//                             >
//                                 Activer le 2FA
//                             </Button>
//                         )}
//                     </Box>
//                 )}
//             </Paper>

//             <TwoFactorModal
//                 open={showTwoFactorModal}
//                 onClose={handleCloseTwoFactor}
//                 mode={profile?.otp_enable === 1 ? 'deactivate' : 'activate'}
//             />
//         </>
//     );
// };
import React from 'react';
import {
    Box,
    Button,
    Typography,
    Alert,
    CircularProgress,
    // Paper,
    Divider,
    Skeleton,
    Chip,
    Card,
    CardContent,
    Stack,
    Avatar,
} from '@mui/material';
import { useProfile } from '../hooks/useProfile';
import { TwoFactorModal } from './TwoFactorModal';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SecurityIcon from '@mui/icons-material/Security';
import ShieldIcon from '@mui/icons-material/Shield';

export const ProfilePage: React.FC = () => {
    const {
        profile,
        isLoading,
        error,
        isOtpLoading,
        otpError,
        showTwoFactorModal,
        handleOpenTwoFactor,
        handleCloseTwoFactor,
    } = useProfile();

    // Displaying initial loading state
    if (isLoading) {
        return (
            <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6, p: 3 }}>
                <Skeleton variant="circular" width={80} height={80} sx={{ mx: 'auto', mb: 3 }} />
                <Skeleton variant="text" height={50} sx={{ mb: 3 }} />
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3, mb: 2 }} />
                <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 3 }} />
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6, px: 3, pb: 6 }}>
                {/* Header avec Avatar */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            mx: 'auto',
                            mb: 2,
                            bgcolor: 'primary.main',
                            fontSize: '2rem',
                        }}
                    >
                        {profile?.username?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                    <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
                        {profile?.username || 'Mon Profil'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Gérez vos informations personnelles et votre sécurité
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
                )}

                {profile && (
                    <Stack spacing={3}>
                        {/* Carte Informations Personnelles */}
                        <Card 
                            elevation={0} 
                            sx={{ 
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                overflow: 'hidden'
                            }}
                        >
                            <Box 
                                sx={{ 
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    p: 2,
                                }}
                            >
                                <Typography variant="h6" color="white" fontWeight={600}>
                                    Informations Personnelles
                                </Typography>
                            </Box>
                            <CardContent sx={{ p: 3 }}>
                                <Stack spacing={3}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: 'primary.lighter' }}>
                                            <PersonIcon color="primary" />
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                                Nom d'utilisateur
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                {profile.username}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Divider />

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: 'info.lighter' }}>
                                            <EmailIcon color="info" />
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                                Adresse email
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                {profile.email}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Divider />

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: 'success.lighter' }}>
                                            <CalendarMonthIcon color="success" />
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                                Membre depuis
                                            </Typography>
                                            <Typography variant="body1" fontWeight={500}>
                                                {new Date(profile.createdAt).toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Carte Sécurité 2FA */}
                        <Card 
                            elevation={0} 
                            sx={{ 
                                borderRadius: 3,
                                border: '1px solid',
                                borderColor: 'divider',
                                overflow: 'hidden'
                            }}
                        >
                            <Box 
                                sx={{ 
                                    background: profile.otp_enable === 1 
                                        ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
                                        : 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)',
                                    p: 2,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <ShieldIcon sx={{ color: 'white' }} />
                                    <Typography variant="h6" color="white" fontWeight={600}>
                                        Authentification à deux facteurs
                                    </Typography>
                                </Box>
                            </Box>
                            <CardContent sx={{ p: 3 }}>
                                {otpError && (
                                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                                        {otpError}
                                    </Alert>
                                )}

                                <Stack spacing={3}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar 
                                            sx={{ 
                                                bgcolor: profile.otp_enable === 1 ? 'success.lighter' : 'warning.lighter',
                                                width: 48,
                                                height: 48
                                            }}
                                        >
                                            <SecurityIcon 
                                                color={profile.otp_enable === 1 ? 'success' : 'warning'} 
                                            />
                                        </Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Statut actuel
                                            </Typography>
                                            <Chip
                                                label={profile.otp_enable === 1 ? 'Activé' : 'Désactivé'}
                                                color={profile.otp_enable === 1 ? 'success' : 'warning'}
                                                size="medium"
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </Box>
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        {profile.otp_enable === 1 
                                            ? 'Votre compte est protégé par une authentification à deux facteurs. Vous devrez fournir un code de vérification lors de chaque connexion.'
                                            : 'Renforcez la sécurité de votre compte en activant l\'authentification à deux facteurs. Vous recevrez un code de vérification à chaque connexion.'
                                        }
                                    </Typography>

                                    {profile.otp_enable === 1 ? (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="large"
                                            onClick={() => handleOpenTwoFactor()}
                                            disabled={isOtpLoading}
                                            sx={{ 
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                py: 1.5
                                            }}
                                        >
                                            {isOtpLoading ? (
                                                <CircularProgress size={24} color="inherit" />
                                            ) : (
                                                'Désactiver le 2FA'
                                            )}
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            onClick={handleOpenTwoFactor}
                                            sx={{ 
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                py: 1.5,
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                                                }
                                            }}
                                        >
                                            Activer le 2FA
                                        </Button>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                )}
            </Box>

            <TwoFactorModal
                open={showTwoFactorModal}
                onClose={handleCloseTwoFactor}
                mode={profile?.otp_enable === 1 ? 'deactivate' : 'activate'}
            />
        </>
    );
};