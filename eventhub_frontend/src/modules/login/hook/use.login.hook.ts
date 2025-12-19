import { useSelector } from "react-redux";
import type { AppState } from "../../store/store";
import { useAppDispatch } from "../../store/store";
import { loginRequest } from "../../store/auth/auth.slice";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const { user, error } = useSelector((state: AppState) => state.auth);

  const login = (email: string, password: string) => {
    dispatch(loginRequest({ email, password }));
  };

  return {
    user,
    error,
    login,
  };
};
