import {ReactNode} from 'react';
import {Photo} from './APIDataType';

export interface IAppContext {
  apiPhotos: Photo[] | undefined;
  setApiPhotos: React.Dispatch<React.SetStateAction<Photo[] | undefined>>;
  searchResults: Photo[] | undefined;
  setSearchResults: React.Dispatch<React.SetStateAction<Photo[] | undefined>>;
}

export interface ProviderProps {
  children: ReactNode;
}
