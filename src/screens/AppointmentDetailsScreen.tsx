import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { palette, shadows } from '../theme/colors';
import { Image } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'AppointmentDetails'>;

type SectionKey =
  | 'appointment'
  | 'symptoms'
  | 'coupons'
  | 'booking'
  | 'medical';

const AppointmentDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { doctorName, doctorPhoto } = route.params;

  // which sections are open
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>(
    {
      appointment: false,
      symptoms: false,
      coupons: false,
      booking: false,
      medical: false,
    },
  );

  const toggleSection = (key: SectionKey) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* TOP HEADER */}
      <View style={[styles.headerWrapper, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={26}
            color={palette.text}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Appointment Details</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* DOCTOR CARD */}
        <View style={styles.doctorCard}>
          <Image source={{ uri: doctorPhoto }} style={styles.doctorImage} />
          <View style={styles.doctorInfoRow}>
            <Text style={styles.detailLabel}>Doctor name</Text>
            <Text style={styles.detailColon}>:</Text>
            <Text style={styles.detailValue}>{doctorName}</Text>
          </View>
        </View>

        {/* 1. Appointment Details */}
        <CollapsibleCard
          title="Appointment Details"
          isOpen={openSections.appointment}
          onToggle={() => toggleSection('appointment')}>
          <DetailRow label="Appointment ID" value="APPLF12047816" />
          <DetailRow label="Appointment type" value="Freeaudio" />
          <DetailRow label="Appointment fee" value="0 INR" />
          <DetailRow label="Duration" value="1 min" />
          <DetailRow label="Appointment date" value="19 Nov, 2024" />
          <DetailRow label="Appointment time" value="01:51 PM" />
          <DetailRow label="Booking Status" value="Completed" />
          <DetailRow label="Routine status" value="Not assigned" />
        </CollapsibleCard>

        {/* 2. Symptoms Details */}
        <CollapsibleCard
          title="Symptoms Details"
          isOpen={openSections.symptoms}
          onToggle={() => toggleSection('symptoms')}>
          <DetailRow label="Symptoms" value="Anxiety" />
          <DetailRow label="Description" value="N/A" />
          <DetailRow label="Severity" value="Moderate" />
          <DetailRow label="Symptoms Duration" value="weeks" />
          <DetailRow label="Sleep pattern" value="N/A" />
        </CollapsibleCard>

        {/* 3. Coupons Details */}
        <CollapsibleCard
          title="Coupons Details"
          isOpen={openSections.coupons}
          onToggle={() => toggleSection('coupons')}>
          <DetailRow label="Coupon Code" value="N/A" />
          <DetailRow label="Coupon Discount" value="N/A" />
          <DetailRow label="Discount amount" value="0" />
        </CollapsibleCard>

        {/* 4. Booking Details */}
        <CollapsibleCard
          title="Booking Details"
          isOpen={openSections.booking}
          onToggle={() => toggleSection('booking')}>
          <DetailRow label="Booked by" value="Patient" />
          <DetailRow label="Booking date" value="19 Nov, 2024" />
          <DetailRow label="Booking time" value="01:51 PM" />
          <DetailRow label="Payment date" value="29 Jan, 2025" />
          <DetailRow label="Payment Time" value="01:58 PM" />
        </CollapsibleCard>

        {/* 5. Medical Report */}
        <CollapsibleCard
          title="Medical Report"
          isOpen={openSections.medical}
          onToggle={() => toggleSection('medical')}>
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachButtonText}>Attach report</Text>
          </TouchableOpacity>
        </CollapsibleCard>
      </ScrollView>
    </View>
  );
};

export default AppointmentDetailsScreen;

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailColon}>:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const CollapsibleCard: React.FC<{
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen, onToggle, children }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggle}
        style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <MaterialCommunityIcons
          name={isOpen ? 'chevron-up' : 'chevron-right'}
          size={24}
          color={palette.text}
        />
      </TouchableOpacity>

      {isOpen && <View style={styles.cardBody}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },
  headerWrapper: {
    backgroundColor: '#E6F0DC',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: '700',
    color: palette.text,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    ...shadows.card,
  },
  doctorImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 16,
  },
  doctorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    // Removed shadow to match the flat look with border in the image, or keep soft shadow
    ...shadows.card,
    elevation: 2, // slightly less elevation
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: palette.text,
  },
  cardBody: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    flex: 1.1,
    fontSize: 13,
    color: palette.textMuted,
  },
  detailColon: {
    width: 10,
    fontSize: 13,
    color: palette.text,
  },
  detailValue: {
    flex: 1.4,
    fontSize: 13,
    color: palette.text,
  },
  attachButton: {
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: palette.primary,
  },
  attachButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
