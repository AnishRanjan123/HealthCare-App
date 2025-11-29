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

type Props = NativeStackScreenProps<RootStackParamList, 'NoAnswer'>;

const NoAnswerScreen: React.FC<Props> = ({route}) => {
  const {doctorName, doctorPhoto, specialization} = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        {/* Doctor card */}
        <View style={styles.doctorBlock}>
          <Image source={{uri: doctorPhoto}} style={styles.avatar} />
          <Text style={styles.doctorName}>{doctorName}</Text>
          <Text style={styles.specialization}>
            {specialization ?? 'Specialist'}
          </Text>
        </View>

        {/* No Answer text */}
        <Text style={styles.noAnswerText}>No Answer</Text>

        {/* Bell info banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIconWrapper}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={24}
              color="#FFFFFF"
            />
          </View>
          <View style={styles.bannerTextWrapper}>
            <Text style={styles.bannerText}>
              <Text style={styles.bold}>Tap</Text> on the{' '}
              <Text style={styles.bold}>bell</Text> icon to get notified when{' '}
              {doctorName} is <Text style={styles.bold}>online</Text>
            </Text>
          </View>
        </View>

        {/* OR divider */}
        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.orLine} />
        </View>

        {/* Bottom card */}
        <View style={styles.bottomCard}>
          <Text style={styles.bottomText}>
            Start a <Text style={styles.bold}>Chat Consultation</Text> with{' '}
            {doctorName} or consult another expert now.
          </Text>

          <View style={styles.bottomButtonsRow}>
            <TouchableOpacity
              style={styles.moreExpertsButton}
              onPress={() => {
                // navigate to experts list
              }}>
              <Text style={styles.moreExpertsText}>See More Experts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.startChatButton}
              onPress={() => {
                // navigate to chat screen
              }}>
              <Text style={styles.startChatText}>Start Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoAnswerScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  doctorBlock: {
    alignItems: 'center',
    marginTop: 20,
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
  specialization: {
    fontSize: 13,
    color: palette.textMuted,
  },
  noAnswerText: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '600',
    color: '#2F6F3E',
    textAlign: 'center',
  },
  banner: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF6D9',
    borderRadius: 32,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  bannerIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3A5D38',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bannerTextWrapper: {
    flex: 1,
  },
  bannerText: {
    fontSize: 13,
    color: '#324C34',
  },
  bold: {
    fontWeight: '700',
  },
  orRow: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: '#B0B0B0',
  },
  bottomCard: {
    marginTop: 40,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#FFFFFF',
    ...shadows.card,
  },
  bottomText: {
    fontSize: 13,
    textAlign: 'center',
    color: palette.text,
    marginBottom: 20,
  },
  bottomButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreExpertsButton: {
    flex: 1,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: palette.primary,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  moreExpertsText: {
    fontSize: 14,
    color: palette.primary,
    fontWeight: '600',
  },
  startChatButton: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: palette.primary,
    paddingVertical: 10,
    alignItems: 'center',
  },
  startChatText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
