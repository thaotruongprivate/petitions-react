import { Petition } from '../common/types';
import { callApiWith } from './index';
import { throttle } from '../common/functions';

const fetchPetitions = async (): Promise<[Array<Petition>?, Error?]> => {
  try {
    return [await callApiWith<Array<Petition>>({ name: 'petitions' })];
  } catch (error: any) {
    return [undefined, error];
  }
};

export const createPetition = async (
  data: Pick<Petition, 'name' | 'country' | 'description'>
): Promise<[Petition?, Error?]> => {
  try {
    const response = await callApiWith<{ petition: Petition & { dateCreated: string } }>({
      name: 'petitions',
      method: 'post',
      data
    });
    return [response.petition];
  } catch (error: any) {
    return [undefined, error];
  }
};

export default throttle(fetchPetitions, 5000);
