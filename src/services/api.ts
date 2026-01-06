const BASE_URL = 'https://stapubox.com/trial';
const API_TOKEN = 'trial_33936928_f24122124982661df62bdaf6b62095c1';

type ApiResponse<T = any> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export const sendOtp = async (mobile: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/sendOtp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Token': API_TOKEN,
      },
      body: JSON.stringify({ mobile }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
};

export const verifyOtp = async (
  mobile: string,
  otp: string,
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/verifyOtp?mobile=${mobile}&otp=${otp}`,
      {
        method: 'POST',
        headers: {
          'X-Api-Token': API_TOKEN,
        },
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
};

export const resendOtp = async (mobile: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/resendOtp?mobile=${mobile}`,
      {
        method: 'POST',
        headers: {
          'X-Api-Token': API_TOKEN,
        },
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
};
