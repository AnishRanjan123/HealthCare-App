import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Concern } from '../constants/concerns';
import { palette, shadows } from '../theme/colors';

type ConcernGridProps = {
  data: Concern[];
  selectedId?: string;
  onSelect: (id: string) => void;
  columns?: number;
  compactLabel?: boolean;
};

const ConcernGrid: React.FC<ConcernGridProps> = ({
  data,
  selectedId,
  onSelect,
  columns = 3,
  compactLabel,
}) => {
  return (
    <FlatList
      scrollEnabled={false}
      data={data}
      numColumns={columns}
      keyExtractor={item => item.id}
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.gridContainer}
      renderItem={({ item }) => {
        const isSelected = selectedId === item.id;
        return (
          <TouchableOpacity
            style={[styles.card, isSelected && styles.cardSelected]}
            onPress={() => onSelect(item.id)}
            activeOpacity={0.85}>
            <View
              style={[
                styles.outerContainer,
                isSelected && styles.outerContainerSelected,
              ]}>
              <View style={styles.innerContainer}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={32}
                  color={palette.tabBar}
                />
              </View>
            </View>
            <Text
              style={[
                styles.label,
                compactLabel && styles.labelCompact,
                isSelected && styles.labelSelected,
              ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 4,
  },
  column: {
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cardSelected: {
    // No border on card itself
  },
  outerContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  outerContainerSelected: {
    borderColor: palette.tabBar, // Dark green border when selected
  },
  innerContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: palette.accent, // Light green background
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '400',
    color: palette.textMuted,
    textAlign: 'center',
  },
  labelCompact: {
    fontSize: 13,
  },
  labelSelected: {
    color: palette.tabBar,
    fontWeight: '600',
  },
});

export default ConcernGrid;
