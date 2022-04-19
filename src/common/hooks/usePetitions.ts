import { useDispatch, useSelector } from 'react-redux';
import { PetitionState, RootState } from '../types';
import { initialisePetitions } from '../../features/petitions/petitionsActions';
import { useEffect } from 'react';

export default function usePetitions() {
  const dispatch = useDispatch();
  const petitions = useSelector<RootState, PetitionState>((state) => state.petitions);

  useEffect(() => {
    if (petitions.list === null) {
      dispatch<any>(initialisePetitions);
    }
  }, [petitions.list, dispatch]);

  return petitions.list ?? [];
}
