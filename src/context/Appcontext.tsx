import React, { createContext, useReducer, Dispatch } from 'react';

type Application = {
  id: string;
  amount: number;
  term: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
};

type State = {
  applications: Application[];
  user: {
    name: string;
    email: string;
  } | null;
  isLoading: boolean;
};

type Action =
  | { type: 'ADD_APPLICATION'; payload: Application }
  | { type: 'SET_APPLICATIONS'; payload: Application[] }
  | { type: 'SET_USER'; payload: State['user'] }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: State = {
  applications: [],
  user: null,
  isLoading: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_APPLICATION':
      return { ...state, applications: [action.payload, ...state.applications] };
    case 'SET_APPLICATIONS':
      return { ...state, applications: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);