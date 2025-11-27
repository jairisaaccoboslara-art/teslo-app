import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse, User } from "../interfaces";
import { isAxiosError } from 'axios';

interface loginError{
    ok: false;
    message: string;
}

interface loginSuccess{
    ok: true;
    user: User;
    token: string;
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<loginError | loginSuccess> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
      email,
      password,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Usuario o contraseña incorrectos',
      };
    }

    console.log(error);
    throw new Error('No se pudo realizar la petición');
  }
};
