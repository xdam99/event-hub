import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Paper,
    Divider,
    Link as MuiLink,
    Stack,
    InputAdornment,
    Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import type { AppState } from '../../../store/store';
import { verifyOtpLogin, verifyBackupCode, clearError } from '../store/auth.slice';
import LockIcon from '@mui/icons-material/Lock';
// import SecurityIcon from '@mui/icons-material/Security';
import KeyIcon from '@mui/icons-material/Key';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ShieldIcon from '@mui/icons-material/Shield';

export const OtpVerifyPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isLoading, error, tempToken, token } = useSelector((state: AppState) => state.auth);

    const [otpCode, setOtpCode] = useState('');
    const [backupMode, setBackupMode] = useState(false);
    const [backupCodeValue, setBackupCodeValue] = useState('');

    React.useEffect(() => {
        if (token) {
            navigate('/profile');
        }
    }, [token, navigate]);

    React.useEffect(() => {
        if (!tempToken) {
            navigate('/login');
        }
    }, [tempToken, navigate]);

    const handleOtpSubmit = async () => {
        if (!tempToken || !otpCode) return;
        dispatch(clearError());
        try {
            await dispatch(verifyOtpLogin({ tempToken, otpToken: otpCode })).unwrap();
        } catch {
            // Error handled by Redux
        }
    };

    const handleBackupSubmit = async () => {
        if (!tempToken || !backupCodeValue) return;
        dispatch(clearError());
        try {
            await dispatch(verifyBackupCode({ tempToken, backupCode: backupCodeValue })).unwrap();
        } catch {
            // Error handled by Redux
        }
    };

    const toggleBackupMode = () => {
        setBackupMode(!backupMode);
        dispatch(clearError());
    };

    return (
        <Box 
            sx={{ 
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                p: 3
            }}
        >
            <Paper 
                elevation={10}
                sx={{ 
                    maxWidth: 480,
                    width: '100%',
                    borderRadius: 4,
                    overflow: 'hidden'
                }}
            >
                {/* Header avec dégradé */}
                <Box 
                    sx={{ 
                        background: backupMode 
                            ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        p: 4,
                        textAlign: 'center',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        }
                    }}
                >
                    <Box 
                        sx={{ 
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: 'rgba(255, 255, 255, 0.25)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            backdropFilter: 'blur(10px)',
                            border: '3px solid rgba(255, 255, 255, 0.3)',
                            position: 'relative',
                            zIndex: 1,
                        }}
                    >
                        {backupMode ? (
                            <KeyIcon sx={{ fontSize: 40 }} />
                        ) : (
                            <ShieldIcon sx={{ fontSize: 40 }} />
                        )}
                    </Box>
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        fontWeight={700}
                        gutterBottom
                        sx={{ position: 'relative', zIndex: 1 }}
                    >
                        Vérification 2FA
                    </Typography>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            opacity: 0.95,
                            position: 'relative', 
                            zIndex: 1,
                            maxWidth: 360,
                            mx: 'auto'
                        }}
                    >
                        {!backupMode 
                            ? "Entrez le code à 6 chiffres de votre application d'authentification"
                            : "Entrez l'un de vos codes de secours"}
                    </Typography>

                    {/* Chip pour indiquer le mode */}
                    <Chip
                        icon={backupMode ? <KeyIcon /> : <PhoneAndroidIcon />}
                        label={backupMode ? "Mode secours" : "Code OTP"}
                        sx={{
                            mt: 2,
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            fontWeight: 600,
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            position: 'relative',
                            zIndex: 1,
                            '& .MuiChip-icon': {
                                color: 'white'
                            }
                        }}
                    />
                </Box>

                {/* Formulaire */}
                <Box sx={{ p: 4 }}>
                    {error && (
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
                            {error}
                        </Alert>
                    )}

                    {!backupMode ? (
                        <Stack spacing={3}>
                            <Box>
                                <Typography 
                                    variant="body2" 
                                    color="text.secondary" 
                                    sx={{ mb: 1.5, textAlign: 'center', fontWeight: 500 }}
                                >
                                    Code à 6 chiffres
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    value={otpCode}
                                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    disabled={isLoading}
                                    inputProps={{ 
                                        maxLength: 6, 
                                        inputMode: 'numeric',
                                        style: { 
                                            textAlign: 'center', 
                                            fontSize: '2rem',
                                            letterSpacing: '1rem',
                                            fontWeight: 700,
                                            fontFamily: 'monospace',
                                        }
                                    }}
                                    placeholder="••••••"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            bgcolor: 'grey.50',
                                            '& fieldset': {
                                                borderWidth: 2,
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                            },
                                            '&.Mui-focused': {
                                                bgcolor: 'white',
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={otpCode.length !== 6 || isLoading}
                                onClick={handleOtpSubmit}
                                sx={{ 
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    position: 'relative',
                                    boxShadow: '0 4px 14px rgba(102, 126, 234, 0.4)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.5)',
                                    },
                                    '&.Mui-disabled': {
                                        background: 'rgba(0, 0, 0, 0.12)',
                                        boxShadow: 'none',
                                    }
                                }}
                            >
                                {isLoading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Vérifier le code'
                                )}
                            </Button>

                            <Divider sx={{ my: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                    OU
                                </Typography>
                            </Divider>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Vous n'avez pas accès à votre téléphone ?
                                </Typography>
                                <MuiLink
                                    component="button"
                                    variant="body2"
                                    onClick={toggleBackupMode}
                                    sx={{ 
                                        textDecoration: 'none',
                                        color: 'primary.main',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        }
                                    }}
                                >
                                    Utiliser un code de secours →
                                </MuiLink>
                            </Box>
                        </Stack>
                    ) : (
                        <Stack spacing={3}>
                            <Box>
                                <Typography 
                                    variant="body2" 
                                    color="text.secondary" 
                                    sx={{ mb: 1.5, fontWeight: 500 }}
                                >
                                    Code de secours
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    value={backupCodeValue}
                                    onChange={(e) => setBackupCodeValue(e.target.value.toUpperCase())}
                                    disabled={isLoading}
                                    placeholder="ABCD-1234-EFGH"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <KeyIcon sx={{ color: 'error.main', fontSize: 28 }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputProps={{
                                        style: { 
                                            fontFamily: 'monospace',
                                            fontSize: '1.3rem',
                                            letterSpacing: '0.3rem',
                                            fontWeight: 600,
                                        }
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 3,
                                            bgcolor: 'grey.50',
                                            '& fieldset': {
                                                borderWidth: 2,
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'error.main',
                                            },
                                            '&.Mui-focused': {
                                                bgcolor: 'white',
                                            }
                                        }
                                    }}
                                />
                                <Typography 
                                    variant="caption" 
                                    color="text.secondary" 
                                    sx={{ mt: 1, display: 'block', fontStyle: 'italic' }}
                                >
                                    💡 Ce code ne pourra être utilisé qu'une seule fois
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                color="error"
                                size="large"
                                disabled={!backupCodeValue.trim() || isLoading}
                                onClick={handleBackupSubmit}
                                sx={{ 
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    position: 'relative',
                                    boxShadow: '0 4px 14px rgba(245, 87, 108, 0.4)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #e07ce8 0%, #e14559 100%)',
                                        boxShadow: '0 6px 20px rgba(245, 87, 108, 0.5)',
                                    },
                                    '&.Mui-disabled': {
                                        background: 'rgba(0, 0, 0, 0.12)',
                                        boxShadow: 'none',
                                    }
                                }}
                            >
                                {isLoading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Vérifier le code de secours'
                                )}
                            </Button>

                            <Divider sx={{ my: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                    OU
                                </Typography>
                            </Divider>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Vous avez retrouvé votre téléphone ?
                                </Typography>
                                <MuiLink
                                    component="button"
                                    variant="body2"
                                    onClick={toggleBackupMode}
                                    sx={{ 
                                        textDecoration: 'none',
                                        color: 'primary.main',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        }
                                    }}
                                >
                                    ← Utiliser le code OTP
                                </MuiLink>
                            </Box>
                        </Stack>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};