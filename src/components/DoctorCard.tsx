import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Doctor } from '../constants/doctors';
import { palette, shadows } from '../theme/colors';

type DoctorCardProps = {
  doctor: Doctor;
  onPressSchedule?: () => void;
  onPressCall?: () => void;
};

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onPressSchedule,
  onPressCall,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.identity}>
          <Image source={{ uri: doctor.photo }} style={styles.photo} />
          <View style={styles.identityText}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{doctor.name}</Text>
              <View style={styles.statusDot} />
            </View>
            <Text style={styles.meta}>{doctor.specialization}</Text>
            <Text style={styles.meta}>{doctor.languages}</Text>
            <Text style={styles.meta}>Exp : {doctor.experience}</Text>
            <Text style={styles.price}>
              <Text style={styles.priceStriked}>{doctor.price}</Text>{' '}
              <Text style={styles.priceFree}>Free (5min)</Text>
            </Text>
          </View>
        </View>
        <View style={styles.ratingBadge}>
          <MaterialCommunityIcons name="star" size={16} color="#F7B733" />
          <Text style={styles.ratingText}>{doctor.rating}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.ctaRow}>
        <TouchableOpacity
          style={styles.outlineButton}
          onPress={onPressSchedule}>
          <Text style={styles.outlineLabel}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={onPressCall}>
          <Text style={styles.primaryLabel}>Free Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    ...shadows.card,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  identity: {
    flexDirection: 'row',
    flex: 1,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  identityText: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7ED957',
  },
  meta: {
    color: palette.textMuted,
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  price: {
    fontSize: 13,
    marginTop: 6,
    color: palette.textMuted,
  },
  priceStriked: {
    textDecorationLine: 'line-through',
  },
  priceFree: {
    color: '#E54E46',
    fontWeight: '500',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  ratingText: {
    color: palette.text,
    fontWeight: '600',
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginVertical: 16,
  },
  ctaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  outlineButton: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    alignItems: 'center',
  },
  outlineLabel: {
    color: palette.primary,
    fontWeight: '600',
    fontSize: 15,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: palette.primary,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default DoctorCard;
