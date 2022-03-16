import {createContext} from 'react';

export const MediaFilesContext = createContext({
  selectedMediaFiles: [],
  setSelectedMediaFiles: () => {},
  removeSelectedVideoFile: () => {},
  videoMediaFiles: [],
  setVideoMediaFiles: () => {},
});
