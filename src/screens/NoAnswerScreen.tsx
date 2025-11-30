import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { palette } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'NoAnswer'>;

const NoAnswerScreen: React.FC<Props> = ({ navigation, route }) => {
  const { doctorName, doctorPhoto, specialization } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('DoctorList', { concernId: '1', concernLabel: 'General Physician' })}>
          <MaterialCommunityIcons name="close" size={24} color={palette.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.centerContent}>
          <Image source={{ uri: doctorPhoto }} style={styles.avatar} />
          <Text style={styles.doctorName}>{doctorName}</Text>
          <Text style={styles.specialization}>{specialization}</Text>

          <Text style={styles.noAnswerText}>No Answer</Text>

          <View style={styles.notificationCard}>
            <MaterialCommunityIcons name="bell-ring" size={24} color="#3E6452" />
            <Text style={styles.notificationText}>
              Tap on the <Text style={{ fontWeight: '700' }}>bell</Text> icon to get notified when {doctorName} is online
            </Text>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>
        </View>

        <View style={styles.bottomCard}>
          <Text style={styles.bottomCardText}>
            Start a <Text style={{ color: '#3E6452', fontWeight: '600' }}>Chat Consultation</Text> with {doctorName} or consult another expert now.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.textButton}
              onPress={() => navigation.navigate('DoctorList', { concernId: '1', concernLabel: 'General Physician' })}
            >
              <Text style={styles.textButtonLabel}>See More Experts</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => { /* Navigate to Chat */ }}
            >
              <Text style={styles.primaryButtonLabel}>Start Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    zIndex: 1, // Ensure header is above content
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    marginTop: -40, // Pull content up slightly to balance with header
  },
  centerContent: {
    alignItems: 'center',
    marginTop: 60,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    color: palette.textMuted,
    marginBottom: 24,
  },
  noAnswerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E54E46', // Red color for No Answer
    marginBottom: 32,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1', // Light yellow bg
    padding: 16,
    borderRadius: 12,
    gap: 12,
    width: '100%',
  },
  notificationText: {
    flex: 1,
    fontSize: 13,
    color: '#5D4037',
    lineHeight: 18,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    fontSize: 14,
    color: palette.textMuted,
  },
  bottomCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  bottomCardText: {
    fontSize: 14,
    color: palette.text,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textButton: {
    padding: 10,
  },
  textButtonLabel: {
    fontSize: 14,
    color: palette.textMuted,
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#3E6452',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  primaryButtonLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default NoAnswerScreen;
