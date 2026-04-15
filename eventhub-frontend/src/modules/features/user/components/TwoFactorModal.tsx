import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    TextField,
    Alert,
    CircularProgress,
    Divider,
    Chip,
    Paper,
    IconButton,
    Stack,
    InputAdornment,
} from '@mui/material';
import { useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import type { AppState } from '../../../store/store';
import { generateOtpSecret, verifyAndActivateOtp, clearOtpSetup, clearOtpError, disableOtp } from '../store/user.slice';
import CloseIcon from '@mui/icons-material/Close';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SecurityIcon from '@mui/icons-material/Security';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LockIcon from '@mui/icons-material/Lock';
import ShieldIcon from '@mui/icons-material/Shield';

interface TwoFactorModalProps {
    open: boolean;
    onClose: () => void;
    mode: 'activate' | 'deactivate';
}

export const TwoFactorModal: React.FC<TwoFactorModalProps> = ({ open, onClose, mode }) => {
    const dispatch = useAppDispatch();
    const { otpSetup, otpActivationResult, isOtpLoading, otpError } = useSelector(
        (state: AppState) => state.user
    );

    const [otpCode, setOtpCode] = useState('');
    const [copiedKey, setCopiedKey] = useState(false);

    const handleGenerate = () => {
        dispatch(generateOtpSecret());
    };

    const handleVerify = async () => {
        if (!otpCode) return;
        try {
            await dispatch(verifyAndActivateOtp(otpCode)).unwrap();
        } catch {
            // Error handled by Redux
        }
    };

    const handleDeactivate = async () => {
        try {
            await dispatch(disableOtp()).unwrap();
            onClose();
        } catch {
            // Error handled by Redux
        }
    };

    const handleClose = () => {
        dispatch(clearOtpSetup());
        dispatch(clearOtpError());
        setOtpCode('');
        setCopiedKey(false);
        onClose();
    };

    const handleCopyKey = () => {
        if (otpSetup?.manualKey) {
            navigator.clipboard.writeText(otpSetup.manualKey);
            setCopiedKey(true);
            setTimeout(() => setCopiedKey(false), 2000);
        }
    };

    const handleCopyAllCodes = () => {
        if (otpActivationResult?.backupCodes) {
            const codes = otpActivationResult.backupCodes.join('\n');
            navigator.clipboard.writeText(codes);
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    overflow: 'hidden',
                }
            }}
        >
            <Box
                sx={{
                    background: mode === 'activate' 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'linear-gradient(135deg, #fc4a1a 0%, #f7b733 100%)',
                    color: 'white',
                    p: 3,
                    position: 'relative',
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'white',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        {mode === 'activate' ? (
                            <ShieldIcon sx={{ fontSize: 28 }} />
                        ) : (
                            <WarningAmberIcon sx={{ fontSize: 28 }} />
                        )}
                    </Box>
                    <Box>
                        <Typography variant="h5" fontWeight={700}>
                            {mode === 'deactivate' && !otpActivationResult ? 'Désactiver le 2FA' : 'Activer le 2FA'}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {mode === 'deactivate' && !otpActivationResult 
                                ? 'Retirer la protection supplémentaire'
                                : 'Sécurisez votre compte'}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <DialogContent sx={{ p: 3 }}>
                {otpError && (
                    <Alert 
                        severity="error" 
                        sx={{ mb: 3, borderRadius: 2 }}
                    >
                        {otpError}
                    </Alert>
                )}

                {/* Step 1: Generate the QR code */}
                {mode === 'activate' && !otpSetup && !otpActivationResult && (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                        <Box
                            sx={{
                                width: 100,
                                height: 100,
                                borderRadius: '50%',
                                bgcolor: 'primary.lighter',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 3,
                            }}
                        >
                            <QrCode2Icon sx={{ fontSize: 50, color: 'primary.main' }} />
                        </Box>
                        <Typography variant="h6" gutterBottom fontWeight={600}>
                            Configuration 2FA
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                            Scannez le QR code avec votre application d'authentification (Google Authenticator, Authy, Microsoft Authenticator, etc.)
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleGenerate}
                            disabled={isOtpLoading}
                            startIcon={isOtpLoading ? <CircularProgress size={20} color="inherit" /> : <QrCode2Icon />}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                py: 1.5,
                                px: 4,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                                }
                            }}
                        >
                            Générer le QR code
                        </Button>
                    </Box>
                )}

                {/* Step 2: Show QR code + manual key + verify */}
                {mode === 'activate' && otpSetup && !otpActivationResult && (
                    <Stack spacing={3}>
                        {/* QR Code Section */}
                        <Paper 
                            elevation={0}
                            sx={{ 
                                p: 3, 
                                textAlign: 'center',
                                bgcolor: 'grey.50',
                                borderRadius: 2,
                                border: '2px dashed',
                                borderColor: 'primary.main',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary" gutterBottom fontWeight={500}>
                                Scannez ce QR code
                            </Typography>
                            <Box
                                sx={{
                                    display: 'inline-block',
                                    p: 2,
                                    bgcolor: 'white',
                                    borderRadius: 2,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    mt: 1,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={otpSetup.qrCodeDataUrl}
                                    alt="QR Code OTP"
                                    sx={{ 
                                        width: 200, 
                                        height: 200,
                                        display: 'block',
                                    }}
                                />
                            </Box>
                        </Paper>

                        <Divider>
                            <Chip label="OU" size="small" />
                        </Divider>

                        {/* Manual Key Section */}
                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom fontWeight={500}>
                                Entrez cette clé manuellement
                            </Typography>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    bgcolor: 'grey.50',
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: 1,
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: 'monospace',
                                        letterSpacing: 2,
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        color: 'primary.main',
                                    }}
                                >
                                    {otpSetup.manualKey}
                                </Typography>
                                <IconButton 
                                    size="small" 
                                    onClick={handleCopyKey}
                                    sx={{
                                        bgcolor: copiedKey ? 'success.main' : 'primary.main',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: copiedKey ? 'success.dark' : 'primary.dark',
                                        }
                                    }}
                                >
                                    {copiedKey ? <CheckCircleIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                                </IconButton>
                            </Paper>
                        </Box>

                        <Divider />

                        {/* Verification Section */}
                        <Box>
                            <Typography variant="body2" fontWeight={600} gutterBottom>
                                Vérification
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Entrez le code à 6 chiffres affiché dans votre application
                            </Typography>
                            <TextField
                                fullWidth
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                inputProps={{ 
                                    maxLength: 6, 
                                    inputMode: 'numeric',
                                    style: {
                                        textAlign: 'center',
                                        fontSize: '1.5rem',
                                        letterSpacing: '0.8rem',
                                        fontWeight: 700,
                                        fontFamily: 'monospace',
                                    }
                                }}
                                placeholder="••••••"
                                disabled={isOtpLoading}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        bgcolor: 'grey.50',
                                    }
                                }}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                onClick={handleVerify}
                                disabled={otpCode.length !== 6 || isOtpLoading}
                                sx={{
                                    mt: 2,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    py: 1.5,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                                    },
                                    '&.Mui-disabled': {
                                        background: 'rgba(0, 0, 0, 0.12)',
                                    }
                                }}
                            >
                                {isOtpLoading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Activer le 2FA'
                                )}
                            </Button>
                        </Box>
                    </Stack>
                )}

                {/* Step 3: Show backup codes */}
                {otpActivationResult && (
                    <Stack spacing={3}>
                        <Alert 
                            severity="success" 
                            icon={<CheckCircleIcon />}
                            sx={{ borderRadius: 2 }}
                        >
                            <Typography fontWeight={600}>
                                L'authentification à deux facteurs est activée !
                            </Typography>
                        </Alert>

                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                <SecurityIcon color="warning" />
                                <Typography variant="h6" fontWeight={600}>
                                    Codes de secours
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                Conservez ces codes en lieu sûr. Ils vous permettront de vous connecter si vous perdez l'accès à votre application d'authentification.
                            </Typography>
                        </Box>

                        <Alert severity="warning" sx={{ borderRadius: 2 }}>
                            Chaque code est unique et ne peut être utilisé qu'une seule fois.
                        </Alert>

                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                            <Typography variant="body2" fontWeight={600} gutterBottom>
                                ⚠️ Ces codes ne seront plus affichés !
                            </Typography>
                            <Typography variant="body2">
                                Notez-les maintenant et stockez-les dans plusieurs endroits différents.
                            </Typography>
                        </Alert>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                bgcolor: 'grey.900',
                                borderRadius: 2,
                                position: 'relative',
                            }}
                        >
                            <IconButton
                                size="small"
                                onClick={handleCopyAllCodes}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: 'white',
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                                    }
                                }}
                            >
                                <ContentCopyIcon fontSize="small" />
                            </IconButton>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)',
                                    gap: 1.5,
                                    mt: 2,
                                }}
                            >
                                {otpActivationResult.backupCodes.map((code, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            p: 1.5,
                                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                                            borderRadius: 1,
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontFamily: 'monospace',
                                                textAlign: 'center',
                                                color: 'white',
                                                fontSize: '0.95rem',
                                                fontWeight: 600,
                                                letterSpacing: 1,
                                            }}
                                        >
                                            {code}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Paper>
                    </Stack>
                )}

                {/* Deactivation confirmation */}
                {mode === 'deactivate' && !otpActivationResult && (
                    <Stack spacing={3}>
                        <Box sx={{ textAlign: 'center', py: 2 }}>
                            <Box
                                sx={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: '50%',
                                    bgcolor: 'error.lighter',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2,
                                }}
                            >
                                <WarningAmberIcon sx={{ fontSize: 50, color: 'error.main' }} />
                            </Box>
                        </Box>

                        <Alert severity="warning" sx={{ borderRadius: 2 }}>
                            <Typography variant="body2" fontWeight={600} gutterBottom>
                                Attention !
                            </Typography>
                            <Typography variant="body2">
                                Votre compte sera moins sécurisé sans l'authentification à deux facteurs. Êtes-vous sûr de vouloir continuer ?
                            </Typography>
                        </Alert>

                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            size="large"
                            onClick={handleDeactivate}
                            disabled={isOtpLoading}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                py: 1.5,
                            }}
                        >
                            {isOtpLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Désactiver le 2FA'
                            )}
                        </Button>
                    </Stack>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button 
                    onClick={handleClose}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                >
                    Fermer
                </Button>
            </DialogActions>
        </Dialog>
    );
};