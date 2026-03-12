import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import type { AppState } from '../../../store/store';
import { fetchProfile, disableOtp } from '../store/user.slice';

export const useProfile = () => {
    const dispatch = useAppDispatch();

    const { profile, isLoading, error, isOtpLoading, otpError } = useSelector(
        (state: AppState) => state.user
    );

    const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    const handleOpenTwoFactor = () => {
        setShowTwoFactorModal(true);
    };

    const handleCloseTwoFactor = () => {
        setShowTwoFactorModal(false);
        dispatch(fetchProfile());
    };

    const handleDisableOtp = async () => {
        try {
            await dispatch(disableOtp()).unwrap();
            dispatch(fetchProfile());
        } catch {
            // Géré par Redux, pas besoin de faire quoi que ce soit ici, mais on pourrait ajouter une notification d'erreur si on voulait
        }
    };

    return {
        profile,
        isLoading,
        error,
        isOtpLoading,
        otpError,
        showTwoFactorModal,
        handleOpenTwoFactor,
        handleCloseTwoFactor,
        handleDisableOtp,
    };
};
