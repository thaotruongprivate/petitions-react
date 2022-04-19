import { Petition, PetitionsActionType, PetitionsReducer } from '../../common/types';
import { defaultPetitionsState } from '../../store/defaults';

// eslint-disable-next-line @typescript-eslint/default-param-last
export const petitionsReducer: PetitionsReducer = (state = defaultPetitionsState, action) => {
  switch (action.type) {
    case PetitionsActionType.ADD_PETITION:
      return { ...state, list: [...(state.list ?? []), action.payload?.data] };
    case PetitionsActionType.DELETE_PETITION:
      return state;
    case PetitionsActionType.GET_PETITIONS_START:
      return {
        ...state,
        getting: true
      };
    case PetitionsActionType.GET_PETITIONS_FINISHED:
      return {
        ...state,
        getting: false
      };
    case PetitionsActionType.SET_PETITIONS:
      return {
        ...state,
        list: action.payload?.data.map((petition: Petition & { dateCreated: string }) => {
          return { ...petition, dateCreated: new Date(petition.dateCreated) };
        })
      };
    default:
      return state;
  }
};
