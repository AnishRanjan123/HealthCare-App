import React, {createContext, useContext, useState, ReactNode} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  PanResponder,
} from 'react-native';

type OverlayDoctor = {
  name: string;
  photo: string;
  onPress: () => void;
};

type CallOverlayContextValue = {
  showOverlay: (doctorData: OverlayDoctor) => void;
  hideOverlay: () => void;
};

const CallOverlayContext = createContext<CallOverlayContextValue | undefined>(
  undefined,
);

type ProviderProps = {
  children: ReactNode;
};

export const CallOverlayProvider: React.FC<ProviderProps> = ({children}) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [doctor, setDoctor] = useState<OverlayDoctor | null>(null);

  // Draggable position
  const [position, setPosition] = useState({x: 20, y: 500});

  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      setPosition({
        x: gesture.moveX - 80,
        y: gesture.moveY - 80,
      });
    },
  });

  const showOverlay = (doctorData: OverlayDoctor) => {
    setDoctor(doctorData);
    setOverlayVisible(true);
  };

  const hideOverlay = () => setOverlayVisible(false);

  return (
    <CallOverlayContext.Provider value={{showOverlay, hideOverlay}}>
      {children}

      {overlayVisible && doctor && (
        <View
          {...pan.panHandlers}
          style={[
            styles.overlayContainer,
            {top: position.y, left: position.x},
          ]}>
          <TouchableOpacity style={styles.touchArea} onPress={doctor.onPress}>
            <Image source={{uri: doctor.photo}} style={styles.thumbnail} />
            <Text style={styles.nameTag}>{doctor.name}</Text>
          </TouchableOpacity>
        </View>
      )}
    </CallOverlayContext.Provider>
  );
};

export const useCallOverlay = (): CallOverlayContextValue => {
  const ctx = useContext(CallOverlayContext);
  if (!ctx) {
    throw new Error('useCallOverlay must be used within CallOverlayProvider');
  }
  return ctx;
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    zIndex: 999,
  },
  touchArea: {
    width: 130,
    height: 170,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#00000022',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  nameTag: {
    position: 'absolute',
    bottom: 4,
    left: 6,
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});
