import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import ZegoUIKitPrebuiltCall, { ONE_ON_ONE_VOICE_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { zegoConfig } from '../services/zegoConfig';

type Props = NativeStackScreenProps<RootStackParamList, 'CallScreen'>;

const CallScreen: React.FC<Props> = ({ navigation, route }) => {
  const { doctorName, doctorPhoto } = route.params;

  // stable random userID
  const userIDRef = React.useRef(String(Math.floor(Math.random() * 1000000)));
  const userID = userIDRef.current;
  const userName = 'Patient ' + userID;

  const goToEndScreen = React.useCallback(() => {
    setTimeout(() => {
      navigation.navigate('CallEnded', {
        doctorName,
        doctorPhoto,
        duration: '00:00',
        amount: '₹ 0',
      });
    }, 0);
  }, [navigation, doctorName, doctorPhoto]);

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={zegoConfig.appID}
        appSign={zegoConfig.appSign}
        userID={userID}
        userName={userName}
        callID={'call_' + doctorName.replace(/\s+/g, '')} // same callID on both sides
        config={{
          ...ONE_ON_ONE_VOICE_CALL_CONFIG,
          onOnlySelfInRoom: goToEndScreen,
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
