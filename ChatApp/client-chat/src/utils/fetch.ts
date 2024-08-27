import useAuthStore from '../store/AuthZustand';

const baseUrl = import.meta.env.VITE_API_URL;

export const fetchWithoutToken = async (
  endpoint: string,
  data: never,
  method: string = 'GET'
) => {
  const url = `${baseUrl}${endpoint}`;
  if (method === 'GET') {
    const resp = await fetch(url);
    return await resp.json();
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await resp.json();
  }
};

export const fetchWithToken = async (
  endpoint: string,
  data?: never,
  method: string = 'GET'
) => {
  const token = useAuthStore.getState().token;
  const url = `${baseUrl}${endpoint}`;

  if (method === 'GET') {
    const resp = await fetch(url, {
      headers: {
        'x-token': token || '',
      },
    });
    return await resp.json();
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        'x-token': token || '',
      },
      body: JSON.stringify(data),
    });
    return await resp.json();
  }
};
