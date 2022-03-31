import api from "api";
import cacheFactory from "cache-factory";
import { UserType } from "types/user-type";

export const PATH = "/users";

export const getUsers = async () => {
  try {
    const { data } = await api.get<UserType[]>(PATH);
    return data;
  } catch (error) {
    throw error;
  }
};

type GetUserParams = { userId: number };
export const getUser = async ({ userId }: GetUserParams) => {
  try {
    const { data } = await api.get<UserType>(`${PATH}/${userId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (user: Partial<UserType>) => {
  try {
    const { id, ...payload } = user;
    const { data } = await api.put<UserType>(`${PATH}/${id}`, payload);
    const cache = cacheFactory(PATH);
    cache.save(data);

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (user: Partial<UserType>) => {
  try {
    const { data } = await api.delete<UserType>(`${PATH}/${user.id}`);
    const cache = cacheFactory(PATH);
    cache.remove(user);

    return data;
  } catch (error) {
    throw error;
  }
};
