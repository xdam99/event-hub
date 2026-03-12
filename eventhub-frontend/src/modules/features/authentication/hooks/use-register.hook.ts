import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { useSelector } from 'react-redux';
import type { AppState } from '../../../store/store';
import { registerUser } from '../store/auth.slice';

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;

export const useRegister = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { isLoading, error: authError } = useSelector((state: AppState) => state.auth);

    // Redirect to profile after successful registration (token received)
    useEffect(() => {
        if (isSuccess) {
            navigate('/login');
        }
    }, [isSuccess, navigate]);

    // Dynamic validation on each change
    useEffect(() => {
        const newErrors: Record<string, string> = {};

        if (formData.username.length < 3) {
            newErrors.username = "Le nom d'utilisateur doit faire au moins 3 caractères.";
        }

        if (!formData.email) {
            newErrors.email = "L'email est requis";
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "L'email est invalide";
        }

        if (!PASSWORD_REGEX.test(formData.password)) {
            newErrors.password = "Le mot de passe doit faire 12 caractères, inclure Maj, Min, Chiffre et Caractère spécial.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }
        
        setErrors(newErrors);
        // setErrors(prev => ({ ...prev, ...newErrors }));

        const hasErrors = Object.keys(newErrors).length > 0;
        const isFilled = Object.values(formData).every(val => val !== '');
        setIsFormValid(!hasErrors && isFilled);

    }, [formData]);

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!isFormValid) return;

        try {
            await dispatch(registerUser({
                username: formData.username,
                email: formData.email,
                password: formData.password
            })).unwrap();

            setIsSuccess(true);
            setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        } catch {
            // Error handled by Redux state (authError)
        }
    };

    return {
        formData,
        errors,
        isFormValid,
        isLoading,
        authError,
        isSuccess,
        handleChange,
        handleSubmit
    };
};