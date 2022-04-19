import {
  DefaultAction,
  PetitionsThunkAction,
  Petition,
  PetitionsActionType,
  PetitionsThunkActionCreator
} from '../../common/types';
import { ActionCreator, Dispatch } from 'redux';
import fetchPetitions, { createPetition as postPetition } from '../../api/fetchPetitions';

export const setPetitions: ActionCreator<DefaultAction<PetitionsActionType>> = (
  petitions: Array<Petition>
) => {
  return {
    type: PetitionsActionType.SET_PETITIONS,
    payload: {
      data: petitions
    }
  };
};

export const getPetitionsStart: ActionCreator<DefaultAction<PetitionsActionType>> = () => {
  return {
    type: PetitionsActionType.GET_PETITIONS_START
  };
};

export const getPetitionsDone: ActionCreator<DefaultAction<PetitionsActionType>> = () => {
  return {
    type: PetitionsActionType.GET_PETITIONS_FINISHED
  };
};

export const initialisePetitions: PetitionsThunkAction = async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(getPetitionsStart());
  const [petitions, error] = await fetchPetitions();
  dispatch(getPetitionsDone());
  if (error) {
    return;
  }
  dispatch(setPetitions(petitions ?? []));
};

export const createPetition: PetitionsThunkActionCreator =
  (petition: { name: string; country: string; description: string }) =>
  async (dispatch: Dispatch): Promise<void> => {
    const [createdPetition, error] = await postPetition(petition);
    if (error) return;
    dispatch({
      type: PetitionsActionType.ADD_PETITION,
      payload: {
        data: {
          ...createdPetition,
          dateCreated: new Date((createdPetition as Petition).dateCreated)
        }
      }
    });
  };
