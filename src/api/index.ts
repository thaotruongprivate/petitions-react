import axios from 'axios';

export const callApiWith = async <T>(props: {
  name: string;
  method?: 'post' | 'get' | 'put';
  data?: object;
  options?: RequestInit;
  id?: string;
}): Promise<T> => {
  const res = await axios({
    method: props.method ?? 'get',
    url: process.env.REACT_APP_API_BASE_URL + '/' + props.name + (props.id ? '/' + props.id : ''),
    ...(props.data ? { data: props.data } : {}),
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
  if (res.status !== 200 && res.status !== 201 && res.status !== 204) {
    throw new Error('API request failed');
  }
  return res.data;
};
