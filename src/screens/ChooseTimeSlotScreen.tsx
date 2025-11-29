import React, { useState } from 'react';
import {
    Image,
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
import { palette } from '../theme/colors';
import { doctors } from '../constants/doctors';

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseTimeSlot'>;

const ChooseTimeSlotScreen: React.FC<Props> = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const { doctorId, date, consultationType, price } = route.params;
    const doctor = doctors.find(d => d.id === doctorId);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const morningSlots = ['09:00 AM', '09:35 AM', '10:05 AM'];
    const afternoonSlots = ['12:00 PM', '12:35 PM', '01:05 PM'];
    const eveningSlots = ['06:00 PM', '07:00 PM', '08:05 PM'];

    const handleConfirm = () => {
        if (selectedTime) {
            navigation.navigate('ConcernDetails', {
                doctorId,
                date,
                time: selectedTime,
                consultationType,
                price,
            });
        }
    };

    const renderSlots = (title: string, slots: string[]) => (
        <View style={styles.slotSection}>
            <Text style={styles.slotTitle}>{title}</Text>
            <View style={styles.slotGrid}>
                {slots.map(slot => {
                    const isSelected = selectedTime === slot;
                    return (
                        <TouchableOpacity
                            key={slot}
                            style={[styles.slotChip, isSelected && styles.slotChipSelected]}
                            onPress={() => setSelectedTime(slot)}>
                            <Text
                                style={[
                                    styles.slotText,
                                    isSelected && styles.slotTextSelected,
                                ]}>
                                {slot}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );

    return (
        <View style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={[styles.hero, { paddingTop: insets.top + 24 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color={palette.text}
                    />
                </TouchableOpacity>
                <View style={styles.heroText}>
                    <Text style={styles.heroLabel}>Choose Time Slot</Text>
                </View>
                <View style={styles.heroDecoration} />
                <View style={styles.heroDecorationSecondary} />
            </View>

            <View style={styles.doctorInfo}>
                <Image source={{ uri: doctor?.photo }} style={styles.avatar} />
                <View>
                    <Text style={styles.doctorName}>{doctor?.name}</Text>
                    <Text style={styles.specialty}>Male-Female Infertility</Text>
                    <Text style={styles.subText}>{consultationType} - Free</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Pick a time slot</Text>

            {renderSlots('Morning', morningSlots)}
            {renderSlots('Afternoon', afternoonSlots)}
            {renderSlots('Evening', eveningSlots)}

            <View style={styles.footer}>
                <View style={styles.selectedTimeContainer}>
                    <MaterialCommunityIcons
                        name="clock-outline"
                        size={20}
                        color="#304226"
                    />
                    <Text style={styles.selectedTimeText}>
                        {selectedTime ? `${selectedTime}` : 'Select a time'}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        !selectedTime && styles.confirmButtonDisabled,
                    ]}
                    disabled={!selectedTime}
                    onPress={handleConfirm}>
                    <Text style={styles.confirmButtonText}>Confirm Appointment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChooseTimeSlotScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        marginBottom: 24,
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
        backgroundColor: '#D9E9CC',
        borderRadius: 120,
        zIndex: -1,
    },
    heroDecorationSecondary: {
        position: 'absolute',
        bottom: -20,
        right: -20,
        width: 160,
        height: 160,
        backgroundColor: '#E8F4DE',
        borderRadius: 80,
        zIndex: -1,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    doctorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
        paddingHorizontal: 24,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 16,
        marginRight: 16,
    },
    doctorName: {
        fontSize: 18,
        fontWeight: '700',
        color: palette.text,
    },
    specialty: {
        fontSize: 14,
        color: palette.textMuted,
        marginTop: 2,
    },
    subText: {
        fontSize: 14,
        color: palette.textMuted,
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: palette.text,
        marginBottom: 16,
        paddingHorizontal: 24,
    },
    slotSection: {
        marginBottom: 24,
        paddingHorizontal: 24,
    },
    slotTitle: {
        fontSize: 13,
        color: palette.textMuted,
        marginBottom: 12,
    },
    slotGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'space-between',
    },
    slotChip: {
        width: '30%',
        paddingVertical: 16,
        backgroundColor: '#F6F7F2',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slotChipSelected: {
        backgroundColor: '#304226',
    },
    slotText: {
        fontSize: 13,
        color: palette.text,
        fontWeight: '500',
    },
    slotTextSelected: {
        color: '#FFFFFF',
    },
    footer: {
        marginTop: 'auto',
        padding: 24,
        paddingBottom: 34,
    },
    selectedTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        gap: 8,
        backgroundColor: palette.accent,
        borderRadius: 16,
        paddingVertical: 16,
        width: '100%',
    },
    selectedTimeText: {
        color: '#304226',
        fontWeight: '600',
        fontSize: 14,
    },
    confirmButton: {
        backgroundColor: '#304226',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    confirmButtonDisabled: {
        backgroundColor: '#ccc',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
