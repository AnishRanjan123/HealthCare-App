import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {palette, shadows} from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'CallDisconnected'>;

const CallDisconnectedScreen: React.FC<Props> = ({navigation, route}) => {
  const {doctorName, doctorPhoto, duration, amount} = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header row */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="close" size={24} color={palette.text} />
        </TouchableOpacity>

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
        <Image source={{uri: doctorPhoto}} style={styles.avatar} />
        <Text style={styles.doctorName}>{doctorName}</Text>
        <View style={styles.onlineRow}>
          <View style={styles.greenDot} />
          <Text style={styles.onlineText}>Online</Text>
        </View>
      </View>

      {/* Call disconnected */}
      <View style={styles.disconnectedRow}>
        <MaterialCommunityIcons
          name="signal-cellular-2"
          size={20}
          color="#D9534F"
        />
        <Text style={styles.disconnectedText}>Call Disconnected</Text>
      </View>

      {/* Duration + amount */}
      <View style={styles.infoRowWrapper}>
        <View style={styles.infoBlock}>
          <MaterialCommunityIcons
            name="phone-outline"
            size={18}
            color={palette.textMuted}
          />
          <Text style={styles.infoLabel}>Consultation Duration</Text>
          <Text style={styles.infoValue}>{duration}</Text>
        </View>

        <View style={styles.infoBlock}>
          <MaterialCommunityIcons
            name="currency-inr"
            size={18}
            color={palette.textMuted}
          />
          <Text style={styles.infoLabel}>Total Amount Deducted</Text>
          <Text style={styles.infoValue}>{amount}</Text>
        </View>
      </View>

      {/* Low balance card */}
      <View style={styles.lowBalanceCard}>
        <Text style={styles.lowBalanceTitle}>Low Balance</Text>
        <Text style={styles.lowBalanceText}>
          Your call ended due to low balance. Add at least ₹25 to continue
          speaking with {doctorName}.
        </Text>

        <TouchableOpacity
          style={styles.rechargeButton}
          onPress={() => {
            // TODO: navigate to your recharge / wallet screen
          }}>
          <Text style={styles.rechargeText}>Recharge now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CallDisconnectedScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
    paddingHorizontal: 24,
    paddingTop: 16,
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
    borderRadius: 20,
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
  disconnectedRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  disconnectedText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D9534F',
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
  },
  infoValue: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  lowBalanceCard: {
    marginTop: 40,
    borderRadius: 20,
    backgroundColor: '#FFF6DD',
    paddingHorizontal: 20,
    paddingVertical: 18,
    ...shadows.card,
  },
  lowBalanceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 6,
  },
  lowBalanceText: {
    fontSize: 13,
    color: palette.textMuted,
    marginBottom: 18,
  },
  rechargeButton: {
    borderRadius: 18,
    backgroundColor: palette.primary,
    paddingVertical: 12,
    alignItems: 'center',
  },
  rechargeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  flexOne: {
    flex: 1,
  },
});
