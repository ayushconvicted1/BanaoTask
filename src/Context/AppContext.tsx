import React, {createContext, useContext, useMemo, useState} from 'react';
import {IAppContext, ProviderProps} from '../Types/ContextTypes';
import {Photo} from '../Types/APIDataType';

const AppContext = createContext<IAppContext | null>(null);

export const AppProvider = ({children}: ProviderProps) => {
  const [apiPhotos, setApiPhotos] = useState<Photo[] | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<Photo[] | undefined>(
    undefined,
  );

  const providerValue = useMemo(
    (): IAppContext => ({
      apiPhotos,
      setApiPhotos,
      searchResults,
      setSearchResults,
    }),
    [apiPhotos, setApiPhotos, searchResults, setSearchResults],
  );
  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an DoctorProvider');
  }
  return context;
};
