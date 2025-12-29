import { tesloApi } from "@/api/tesloApi";
import type { User } from "@/modules/auth/interfaces";

export const getAllUsers = async (): Promise<User[]> => {
  const { data } = await tesloApi.get<User[]>("/users");
  return data;
};

export const getUserById = async (id: string): Promise<User> => {
  const { data } = await tesloApi.get<User>(`/users/${id}`);
  return data;
};

export const deleteUser = async (id: string) => {
  await tesloApi.delete(`/users/${id}`);
};

export const updateUser = async (id: string, updateData: Partial<User>) => {
  const { data } = await tesloApi.patch<User>(`/users/${id}`, updateData);
  return data;
};

export const updateUserRoles = async (id: string, roles: string[]) => {
  const { data } = await tesloApi.patch<User>(`/users/${id}/roles`, { roles });
  return data;
};

export const updateUserPassword = async (id: string, password: string) => {
  try {
    const { data } = await tesloApi.put<{ message: string }>(`/api/users/${id}/password`, { password });
    return data;
  } catch (error: any) {
    console.error('Error updating password:', error.response?.data || error.message);
    throw error;
  }
};

