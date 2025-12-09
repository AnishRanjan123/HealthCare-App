import React, { useRef, useCallback } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
// @ts-ignore
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { zegoConfig } from '../services/zegoConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'CallScreen'>;

const CallScreen: React.FC<Props> = ({ navigation, route }) => {
  const { doctorName, doctorPhoto } = route.params;

  // stable random userID
  const userIDRef = React.useRef(String(Math.floor(Math.random() * 1000000)));
  const userID = userIDRef.current;
  const userName = 'Patient ' + userID;



  const [isDoctorJoined, setIsDoctorJoined] = React.useState(false);
  const [isCallEnded, setIsCallEnded] = React.useState(false);

  const goToEndScreen = useCallback(() => {
    setIsCallEnded(true); // Hide overlay immediately
    navigation.replace('CallEnded', {
      doctorName,
      doctorPhoto,
      duration: '00:00',
      amount: '₹ 0',
    });
  }, [navigation, doctorName, doctorPhoto]);



  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={zegoConfig.appID}
        appSign={zegoConfig.appSign}
        userID={userID}
        userName={userName}
        callID={'call_' + doctorName.replace(/\s+/g, '')} // Deterministic callID for 2-way call testing
        config={{
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            // This is called when the call ends or if only self is in room for a while
            // For this flow, we might want to handle it differently, but for now keep it.
            goToEndScreen();
          },
          onHangUp: () => {
            // onHangUp is triggered after confirmation or button press
            goToEndScreen();
          },
          onHangUpConfirmation: () => {
            // Return true to execute onHangUp immediately, or handle custom confirmation
            return Promise.resolve(true);
          },
          onUserJoined: (user: any) => {
            setIsDoctorJoined(true);
          },
        }}
      />
      {!isDoctorJoined && !isCallEnded && (
        <View style={styles.ringingOverlay} pointerEvents="none">
          <Text style={styles.ringingText}>Ringing...</Text>

          <View style={styles.avatarContainer}>
            <Image source={{ uri: doctorPhoto }} style={styles.ringingAvatar} />
          </View>
        </View>
      )}
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ringingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', // Semi-transparent dark overlay
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  ringingText: {
    position: 'absolute',
    top: 100,
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 1,
  },

  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    marginBottom: 50, // Move avatar up a bit (adjusted down)
  },
  ringingAvatar: {
    width: '100%',
    height: '100%',
  },
});
