import { Action, Reducer } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type RootState = {
  petitions: PetitionState;
  ui: UiState;
};

export type UiState = {
  loading: boolean;
};

export type PetitionState = {
  list: Array<Petition> | null;
  getting: boolean;
};

export type Petition = {
  id: number;
  name: string;
  description: string;
  country: string;
  dateCreated: Date;
};

export enum PetitionsActionType {
  ADD_PETITION = 'ADD_PETITION',
  DELETE_PETITION = 'DELETE_PETITION',
  GET_PETITIONS_START = 'GET_PETITIONS_START',
  GET_PETITIONS_FINISHED = 'GET_PETITIONS_FINISHED',
  SET_PETITIONS = 'SET_PETITIONS'
}

export type DefaultAction<T> = Action<T> & {
  payload?: {
    data: any;
  };
};

export type PetitionsReducer = Reducer<PetitionState, DefaultAction<PetitionsActionType>>;

export type PetitionsThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  DefaultAction<PetitionsActionType>
>;

export type PetitionsThunkActionCreator = (data: any) => PetitionsThunkAction;
