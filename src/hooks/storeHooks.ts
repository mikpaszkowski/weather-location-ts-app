import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type {
	RootState,
	AppDispatch,
	ThunkAppDispatch,
} from '../store/rootStore';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useThunkAppDispatch = () => useDispatch<ThunkAppDispatch>();
