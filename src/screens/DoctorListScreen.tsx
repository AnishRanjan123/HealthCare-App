import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { palette } from '../theme/colors';
import { doctors } from '../constants/doctors';
import DoctorCard from '../components/DoctorCard';

type Props = NativeStackScreenProps<RootStackParamList, 'DoctorList'>;

const DoctorListScreen: React.FC<Props> = ({ navigation, route }) => {
  const { concernLabel } = route.params;
  const [activeFilter, setActiveFilter] = React.useState(concernLabel);

  const chips = React.useMemo(() => {
    const defaultChips = ['All'];
    const concernLabels = doctors.map(d => d.specialization.split(' ')[0]); // Just getting some variety or use allConcerns
    // Better to use the allConcerns list but for now let's just make sure the current one is there and maybe some others
    // The user wants them scrollable.

    // Let's construct a list from the constants we have, or just hardcode some + the current one.
    // Actually, let's use the allConcerns to populate it so it looks real.
    // We need to import allConcerns first.

    const uniqueLabels = new Set(['All', concernLabel, 'Diabetes', 'Hair', 'Skin', 'Fever']);
    return Array.from(uniqueLabels);
  }, [concernLabel]);

  const renderChip = (label: string, index: number) => {
    const isActive = label === activeFilter;
    const isFilter = label === 'Filter';
    return (
      <TouchableOpacity
        key={label}
        onPress={() => {
          if (label !== 'Filter') {
            setActiveFilter(label);
          }
        }}
        style={[
          styles.chip,
          isActive && styles.chipActive,
          isFilter && styles.chipFilter,
        ]}>
        {isFilter && (
          <MaterialCommunityIcons
            name="tune-variant"
            color={palette.text}
            size={18}
          />
        )}
        <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]}>
          {label}
        </Text>
        {index < chips.length - 1 && !isFilter && (
          <View style={styles.chipDivider} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={palette.text}
            />
          </TouchableOpacity>
          <View style={styles.walletRow}>
            <MaterialCommunityIcons
              name="wallet-outline"
              size={24}
              color={palette.text}
            />
            <Text style={styles.walletAmount}>₹ 150</Text>
          </View>
        </View>

        <Text style={styles.heading}>{activeFilter}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}>
          {chips.map((chip, index) => renderChip(chip, index))}
          {/* Add Filter chip at the end if needed, or just part of the list */}
          {renderChip('Filter', chips.length)}
        </ScrollView>

        <FlatList
          data={doctors}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DoctorCard
              doctor={item}
              onPressSchedule={() =>
                navigation.navigate('ChooseConsultation', {
                  doctorId: item.id,
                  doctorName: item.name,
                  doctorPhoto: item.photo,
                })
              }
              onPressCall={() =>
                navigation.navigate('CallScreen', {
                  doctorName: item.name,
                  doctorPhoto: item.photo,
                })
              }
            />
          )}
          scrollEnabled={false}
          contentContainerStyle={styles.list}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  walletAmount: {
    fontWeight: '600',
    color: palette.text,
    fontSize: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 18,
    color: palette.text,
  },
  filters: {
    marginTop: 24,
    marginBottom: 24,
    paddingRight: 24,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginRight: 12,
    backgroundColor: '#FFFFFF',
  },
  chipActive: {
    backgroundColor: '#E6F0DC',
    borderColor: '#E6F0DC',
  },
  chipFilter: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chipLabel: {
    color: palette.text,
    fontWeight: '500',
    fontSize: 15,
  },
  chipLabelActive: {
    color: palette.text,
    fontWeight: '600',
  },
  chipDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#ECEFE5',
    marginLeft: 12,
  },
  list: {
    paddingBottom: 24,
  },
});

export default DoctorListScreen;
