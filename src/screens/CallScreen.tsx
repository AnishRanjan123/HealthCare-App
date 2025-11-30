import React, { useRef, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
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

  // Refs to hold timer IDs so we can clear them manually
  const noAnswerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lowBalanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (noAnswerTimerRef.current) clearTimeout(noAnswerTimerRef.current);
    if (lowBalanceTimerRef.current) clearTimeout(lowBalanceTimerRef.current);
  }, []);

  const goToEndScreen = useCallback(() => {
    clearTimers(); // CRITICAL: Stop auto-navigation timers when user manually ends call
    setTimeout(() => {
      navigation.navigate('CallEnded', {
        doctorName,
        doctorPhoto,
        duration: '00:00',
        amount: '₹ 0',
      });
    }, 2000); // 2-second delay for smoother transition
  }, [navigation, doctorName, doctorPhoto, clearTimers]);

  const NO_ANSWER_TIMEOUT = 20000; // 20 seconds
  const LOW_BALANCE_TIMEOUT = 30000; // 30 seconds

  // Simulate No Answer (Doctor doesn't pick up)
  React.useEffect(() => {
    noAnswerTimerRef.current = setTimeout(() => {
      // Navigate to NoAnswerScreen if call not "connected" (simulated by time)
      // In a real app, we'd check connection state.
      // For this demo, we'll assume if 20s passes, it's a no-answer.
      navigation.navigate('NoAnswer', {
        doctorName,
        doctorPhoto,
        specialization: 'General Physician', // Dummy data or pass from previous screen
      });
    }, NO_ANSWER_TIMEOUT);

    return () => {
      if (noAnswerTimerRef.current) clearTimeout(noAnswerTimerRef.current);
    };
  }, [navigation, doctorName, doctorPhoto]);

  // Simulate Low Balance (Disconnect after 30s)
  React.useEffect(() => {
    lowBalanceTimerRef.current = setTimeout(() => {
      navigation.navigate('CallDisconnected', {
        doctorName,
        doctorPhoto,
        duration: '00:30',
        amount: '₹ 15',
      });
    }, LOW_BALANCE_TIMEOUT);

    return () => {
      if (lowBalanceTimerRef.current) clearTimeout(lowBalanceTimerRef.current);
    };
  }, [navigation, doctorName, doctorPhoto]);

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={zegoConfig.appID}
        appSign={zegoConfig.appSign}
        userID={userID}
        userName={userName}
        callID={'call_' + doctorName.replace(/\s+/g, '') + '_' + userID} // Unique callID per user/session to ensure fresh timer
        config={{
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            // This is called when the call ends or if only self is in room for a while
            // For this flow, we might want to handle it differently, but for now keep it.
            goToEndScreen();
          },
          onHangUp: goToEndScreen,
        }}
      />
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
