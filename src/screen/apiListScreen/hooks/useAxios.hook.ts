import {useEffect, useState} from 'react';
import axios from 'axios';
import {instance} from '../utils';

interface AxiosResponse {
  data: any;
  status: number;
  statusText: string;
}

const useAxios = () => {
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    return () => {
      source.cancel('Component unmounted: Request cancelled.');
    };
  }, []);

  const fetchData = async ({url, method, data = {}, params = {}}: any) => {
    setLoading(true);

    try {
      const result = await instance({
        url,
        method,
        data: method.toLowerCase() === 'get' ? undefined : data,
        params: method.toLowerCase() === 'get' ? params : undefined,
        cancelToken: axios.CancelToken.source().token,
      });
      setResponse(result);
      return result;
    } catch (error: any) {
      if (axios?.isCancel(error)) {
        console.error('Request cancelled', error.message);
      }
      setError(error?.response ? error?.response?.data : error?.message);
    } finally {
      setLoading(false);
    }
  };

  return {response, error, loading, fetchData};
};

export default useAxios;
