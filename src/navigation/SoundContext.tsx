import {createContext, useContext, useState} from 'react';
import Video from 'react-native-video';

interface SoundContextProps {
  playSound: (soundName: string, isLoop: boolean) => void;
  stopSound: (soundName: string) => void;
}

interface soundProviderProps {
  children: React.ReactNode;
}

const SoundContext = createContext<SoundContextProps | undefined>(undefined);

const soundPaths: {[key: string]: string} = {
  ui: require('../assets/sfx/ui.mp3'),
  candy_shuffle: require('../assets/sfx/candy_shuffle.mp3'),
  candy_clear: require('../assets/sfx/candy_clear.mp3'),
  bg: require('../assets/sfx/bg.mp3'),
  cheer: require('../assets/sfx/cheer.mp3'),
};

const SoundProvider = ({children}: soundProviderProps) => {
  const [sounds, setSounds] = useState<any[]>([]);

  const playSound = (soundName: string, isLoop: boolean) => {
    const soundPath = soundPaths[soundName];
    if (soundPath) {
      setSounds(prev => {
        const updatedSounds = prev?.filter(sound => sound.id !== soundName);

        return [
          ...updatedSounds,
          {
            id: soundName,
            path: soundPath,
            isLoop,
          },
        ];
      });
    } else {
      console.warn(`Sound not found: ${soundName}`);
    }
  };

  const stopSound = (soundName: string) => {
    setSounds(prev => prev?.filter(sound => sound.id !== soundName));
  };

  return (
    <SoundContext.Provider value={{playSound, stopSound}}>
      {children}
      {sounds.map((sound, index) => {
        return (
          <Video
            key={index}
            source={sound.path}
            paused={false}
            repeat={sound.isLoop}
            volume={0.9}
            muted={false}
            resizeMode="cover"
            style={{position: 'absolute', height: 0, width: 0}}
          />
        );
      })}
    </SoundContext.Provider>
  );
};

const useSound = (): SoundContextProps => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

export {SoundProvider, useSound};
