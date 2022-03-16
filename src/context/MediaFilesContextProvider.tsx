import React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {MediaFilesContext} from './MediaFilesContext';

export function MediaFilesContextProvider(props) {
  const [selectedMediaFiles, _setSelectedMediaFiles] = useState([]);
  const [videoMediaFiles, setVideoMediaFiles] = useState([
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
    {
      duration: '00:19',
    },
  ]);

  const setSelectedMediaFiles = useCallback(
    item => {
      // console.log(item);
      if (selectedMediaFiles.length === 0) {
        _setSelectedMediaFiles([item]);
        return;
      }
      const itemIndex = selectedMediaFiles.findIndex(_item => {
        return item.index === _item.index;
      });

      if (itemIndex !== -1) {
        selectedMediaFiles.splice(itemIndex, 1);
        _setSelectedMediaFiles([...selectedMediaFiles]);
      } else {
        _setSelectedMediaFiles([...selectedMediaFiles, item]);
      }
    },
    [selectedMediaFiles],
  );

  useEffect(() => {
    setVideoMediaFiles([
      ...videoMediaFiles.map((video, index) => {
        const selectedIndex = selectedMediaFiles.findIndex(_item => {
          return index === _item.index;
        });

        if (selectedIndex !== -1) {
          return {...video, index: selectedIndex + 1};
        } else {
          return {...video, index: undefined};
        }
      }),
    ]);
    console.log(JSON.stringify(videoMediaFiles, null, 2));
  }, [selectedMediaFiles]);

  const removeSelectedVideoFile = useCallback(
    item => {
      const itemIndex = selectedMediaFiles.findIndex(_item => {
        return item.index === _item.index;
      });

      if (itemIndex !== -1) {
        selectedMediaFiles.splice(itemIndex, 1);
        _setSelectedMediaFiles([...selectedMediaFiles]);
      }
    },
    [selectedMediaFiles],
  );

  return (
    <MediaFilesContext.Provider
      value={{
        selectedMediaFiles,
        setSelectedMediaFiles,
        removeSelectedVideoFile,
        videoMediaFiles,
        setVideoMediaFiles,
      }}>
      {props.children}
    </MediaFilesContext.Provider>
  );
}
