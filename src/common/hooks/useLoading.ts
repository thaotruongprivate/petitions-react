import { useSelector } from 'react-redux';
import { RootState, UiState } from '../types';

export default function useLoading() {
  const uiState = useSelector<RootState, UiState>((state) => state.ui);
  return uiState.loading;
}
