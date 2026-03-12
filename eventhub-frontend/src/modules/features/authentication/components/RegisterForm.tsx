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
import { useRegister } from '../hooks/use-register.hook';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import HowToRegIcon from '@mui/icons-material/HowToReg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const RegisterForm: React.FC = () => {
    const { formData, errors, isFormValid, isLoading, authError, isSuccess, handleChange, handleSubmit } = useRegister();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <Box 
            sx={{ 
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
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
                        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                        p: 4,
                        textAlign: 'center',
                        color: 'white'
                    }}
                >
                    {/* <Box 
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
                        <HowToRegIcon sx={{ fontSize: 35 }} />
                    </Box> */}
                    <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
                        Créer un compte
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.95 }}>
                        Rejoignez-nous en quelques instants
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

                    {isSuccess && (
                        <Alert 
                            severity="success"
                            icon={<CheckCircleIcon fontSize="inherit" />}
                            sx={{ 
                                mb: 3, 
                                borderRadius: 2,
                                '& .MuiAlert-icon': {
                                    fontSize: 24
                                }
                            }}
                        >
                            Inscription réussie ! Redirection...
                        </Alert>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <TextField
                            label="Nom d'utilisateur"
                            variant="outlined"
                            fullWidth
                            value={formData.username}
                            onChange={handleChange('username')}
                            error={!!errors.username}
                            helperText={errors.username}
                            disabled={isLoading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon color={errors.username ? 'error' : 'action'} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: 'success.main',
                                    },
                                }
                            }}
                        />

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
                                        borderColor: 'success.main',
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
                                        borderColor: 'success.main',
                                    },
                                }
                            }}
                        />

                        <TextField
                            label="Confirmer le mot de passe"
                            type={showConfirmPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            value={formData.confirmPassword}
                            onChange={handleChange('confirmPassword')}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            disabled={isLoading}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color={errors.confirmPassword ? 'error' : 'action'} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowConfirmPassword}
                                            edge="end"
                                            disabled={isLoading}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: 'success.main',
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
                                mt: 1,
                                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                position: 'relative',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #0e7a6f 0%, #2dd964 100%)',
                                },
                                '&.Mui-disabled': {
                                    background: 'rgba(0, 0, 0, 0.12)',
                                }
                            }}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "S'inscrire"
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
                            Vous avez déjà un compte ?
                        </Typography>
                        <Link 
                            to="/login" 
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
                                    borderColor: 'success.main',
                                    color: 'success.main',
                                    '&:hover': {
                                        borderColor: 'success.dark',
                                        bgcolor: 'success.lighter',
                                    }
                                }}
                            >
                                Se connecter
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};