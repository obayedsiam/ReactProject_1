import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {callApi, selectApi} from '../Reducers/apiSlice';

const useListApi = ({operationId, output}) => {
  
  const {
    loading,
    [output]: response = {
      data: [],
    }
  } = useSelector(selectApi);
  

  //console.log(data, "Prinitng data in useListApi");
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(callApi({
      operationId,
      output: output ?? 'list'
    }));
  }, [dispatch, operationId, output]);
  
  return {
    loading,
    data: response.data
  };
  
};

export default useListApi;