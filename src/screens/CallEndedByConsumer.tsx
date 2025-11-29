import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { palette } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'CallEnded'>;

const CallEndedScreen: React.FC<Props> = ({ navigation, route }) => {
  const { doctorName, doctorPhoto, duration, amount } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.flexOne} />
        <View style={styles.walletRow}>
          <MaterialCommunityIcons
            name="wallet-outline"
            size={20}
            color={palette.text}
          />
          <Text style={styles.walletAmount}>₹ 150</Text>
        </View>
      </View>

      {/* Doctor info */}
      <View style={styles.doctorBlock}>
        <Image source={{ uri: doctorPhoto }} style={styles.avatar} />
        <Text style={styles.doctorName}>{doctorName}</Text>
        <View style={styles.onlineRow}>
          <View style={styles.greenDot} />
          <Text style={styles.onlineText}>Online</Text>
        </View>
      </View>

      {/* Call ended */}
      <View style={styles.callEndedRow}>
        <MaterialCommunityIcons
          name="signal-cellular-2"
          size={20}
          color="#2E7D32"
        />
        <Text style={styles.callEndedText}>Call Ended</Text>
      </View>

      {/* Duration + amount */}
      <View style={styles.infoRowWrapper}>
        <View style={styles.infoBlock}>
          <MaterialCommunityIcons
            name="phone-outline"
            size={20}
            color={palette.textMuted}
          />
          <Text style={styles.infoLabel}>Consultation Duration</Text>
          <Text style={styles.infoValue}>{duration}</Text>
        </View>

        <View style={styles.infoBlock}>
          <MaterialCommunityIcons
            name="wallet-outline"
            size={20}
            color={palette.textMuted}
          />
          <Text style={styles.infoLabel}>Total Amount Deducted</Text>
          <Text style={styles.infoValue}>{amount}</Text>
        </View>
      </View>

      {/* Bottom buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.callAgainButton}
          onPress={() => {
            // Call again – maybe go back to CallScreen / VideoCall
            navigation.navigate('CallScreen', {
              doctorName,
              doctorPhoto,
            });
          }}>
          <Text style={styles.callAgainText}>Call Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            navigation.reset({
              index: 1,
              routes: [
                { name: 'MainTabs' },
                { name: 'MyBookings' },
              ],
            });
          }}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CallEndedScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  walletAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.text,
  },
  doctorBlock: {
    alignItems: 'center',
    marginTop: 32,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 18,
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 4,
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  onlineText: {
    fontSize: 12,
    color: palette.textMuted,
  },
  callEndedRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  callEndedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
  infoRowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 8,
  },
  infoBlock: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    marginTop: 8,
    fontSize: 12,
    color: palette.textMuted,
    textAlign: 'center',
  },
  infoValue: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  bottomButtons: {
    marginTop: 'auto',
    paddingHorizontal: 24,
    width: '100%',
  },
  callAgainButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#304226',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  callAgainText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#304226',
  },
  doneButton: {
    borderRadius: 12,
    backgroundColor: '#304226',
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
  },
  doneText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  flexOne: {
    flex: 1,
  },
});
