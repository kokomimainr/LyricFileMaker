import { axiosInstance } from '../lib/axiosInstance';

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('/auth/check-email', { email });
    return response.data.exists === true;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
};