// userService.ts
import axios from 'axios';
import { ApiResponse } from '../types/user';

import { LISTING } from '../constants/constants';

export const fetchUsers = async (): Promise<ApiResponse | undefined> => {
  try {
    const response = await axios.get<ApiResponse>(LISTING.API_URL+LISTING.TOTAL_USERS_COUNT);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return undefined;
  }
};
