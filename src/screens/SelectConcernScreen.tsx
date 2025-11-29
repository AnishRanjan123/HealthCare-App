import React, { useMemo, useState } from 'react';
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
import ConcernGrid from '../components/ConcernGrid';
import { allConcerns, topConcerns } from '../constants/concerns';
import { palette } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';

type Props = any;

const SelectConcernScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(topConcerns[0]?.id);
  const concernOptions = useMemo(() => [...topConcerns, ...allConcerns], []);

  const handleSelectConcern = (id: string) => {
    setSelectedId(id);
    const concern = concernOptions.find(option => option.id === id);
    if (concern) {
      navigation.navigate('DoctorList', {
        concernId: concern.id,
        concernLabel: concern.label,
      });
    }
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { paddingTop: insets.top + 24 }]}>
          <TouchableOpacity style={styles.backButton}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={palette.text}
            />
          </TouchableOpacity>
          <View style={styles.heroText}>
            <Text style={styles.heroLabel}>Select Concern</Text>
          </View>
          <View style={styles.heroDecoration} />
          <View style={styles.heroDecorationSecondary} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Concerns</Text>
          <ConcernGrid
            data={topConcerns}
            selectedId={selectedId}
            onSelect={handleSelectConcern}
            columns={3}
          />
        </View>

        <View style={styles.section}>
          <ConcernGrid
            data={allConcerns}
            selectedId={selectedId}
            onSelect={handleSelectConcern}
            columns={3}
            compactLabel
          />
        </View>
      </ScrollView>


    </View>
  );
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 120,
  },
  hero: {
    backgroundColor: palette.accent,
    // marginHorizontal: 16, // Removed
    // marginTop: 16,        // Removed
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    padding: 24,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 200,
  },
  heroText: {
    marginTop: 24,
  },
  heroLabel: {
    fontSize: 32,
    fontWeight: '400',
    color: palette.text,
  },
  heroDecoration: {
    position: 'absolute',
    top: -40,
    right: -60,
    width: 240,
    height: 240,
    backgroundColor: palette.accentSecondary,
    borderRadius: 120,
    zIndex: -1,
  },
  heroDecorationSecondary: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    width: 160,
    height: 160,
    backgroundColor: palette.accent,
    borderRadius: 80,
    zIndex: -1,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: palette.textMuted,
    marginBottom: 20,
  },
});

export default SelectConcernScreen;
