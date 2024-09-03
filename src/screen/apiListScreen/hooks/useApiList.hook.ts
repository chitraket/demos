import {useEffect} from 'react';
import useAxios from './useAxios.hook';
import {endPoint} from '../utils';

const useApiList = () => {
  const {response, loading, fetchData} = useAxios();
  const handleFetchData = async () => {
    await fetchData({
      url: endPoint.GET_PHONE_API,
      method: 'GET',
    });
  };
  useEffect(() => {
    handleFetchData();
  }, []);
  return {loading, response};
};

export default useApiList;
