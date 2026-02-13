import React from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Alert, 
    CircularProgress,
    Paper,
    InputAdornment,
    IconButton,
    Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

export const LoginForm: React.FC = () => {
    const { formData, errors, isLoading, authError, isFormValid, handleChange, handleSubmit } = useLogin();
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <Box 
            sx={{ 
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                p: 3
            }}
        >
            <Paper 
                elevation={10}
                sx={{ 
                    maxWidth: 440,
                    width: '100%',
                    borderRadius: 4,
                    overflow: 'hidden'
                }}
            >
                {/* Header avec dégradé */}
                <Box 
                    sx={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        p: 4,
                        textAlign: 'center',
                        color: 'white'
                    }}
                >
                    <Box 
                        sx={{ 
                            width: 70,
                            height: 70,
                            borderRadius: '50%',
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <LoginIcon sx={{ fontSize: 35 }} />
                    </Box>
                    <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
                        Bon retour !
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.95 }}>
                        Connectez-vous pour accéder à votre compte
                    </Typography>
                </Box>

                {/* Formulaire */}
                <Box sx={{ p: 4 }}>
                    {authError && (
                        <Alert 
                            severity="error" 
                            sx={{ 
                                mb: 3, 
                                borderRadius: 2,
                                '& .MuiAlert-icon': {
                                    fontSize: 24
                                }
                            }}
                        >
                            {authError}
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Adresse email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange('email')}
                            error={!!errors.email}
                            helperText={errors.email}
                            disabled={isLoading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color={errors.email ? 'error' : 'action'} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                }
                            }}
                        />

                        <TextField
                            label="Mot de passe"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            value={formData.password}
                            onChange={handleChange('password')}
                            error={!!errors.password}
                            helperText={errors.password}
                            disabled={isLoading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color={errors.password ? 'error' : 'action'} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            disabled={isLoading}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                }
                            }}
                        />

                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="large"
                            disabled={!isFormValid || isLoading}
                            onClick={handleSubmit}
                            sx={{ 
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                py: 1.5,
                                fontSize: '1rem',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                position: 'relative',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                                },
                                '&.Mui-disabled': {
                                    background: 'rgba(0, 0, 0, 0.12)',
                                }
                            }}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Se connecter'
                            )}
                        </Button>
                    </Box>

                    <Divider sx={{ my: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                            OU
                        </Typography>
                    </Divider>

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Pas encore de compte ?
                        </Typography>
                        <Link 
                            to="/register" 
                            style={{ 
                                textDecoration: 'none',
                            }}
                        >
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    py: 1.2,
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                    '&:hover': {
                                        borderColor: 'primary.dark',
                                        bgcolor: 'primary.lighter',
                                    }
                                }}
                            >
                                Créer un compte
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};