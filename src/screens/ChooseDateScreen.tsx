import React, { useState } from 'react';
import {
    Image,
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
import { palette } from '../theme/colors';
import { doctors } from '../constants/doctors';

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseDate'>;

const ChooseDateScreen: React.FC<Props> = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const { doctorId, consultationType, price } = route.params;
    const doctor = doctors.find(d => d.id === doctorId);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    // Mock dates
    const dates = [
        { day: '06 Feb', weekday: 'Friday' },
        { day: '07 Feb', weekday: 'Saturday' },
        { day: '08 Feb', weekday: 'Sunday' },
        { day: '09 Feb', weekday: 'Monday' },
        { day: '10 Feb', weekday: 'Tuesday' },
        { day: '11 Feb', weekday: 'Wednesday' },
        { day: '12 Feb', weekday: 'Thursday' },
        { day: '13 Feb', weekday: 'Friday' },
        { day: '14 Feb', weekday: 'Saturday' },
        { day: '15 Feb', weekday: 'Sunday' },
        { day: '16 Feb', weekday: 'Monday' },
        { day: '17 Feb', weekday: 'Tuesday' },
        { day: '18 Feb', weekday: 'Wednesday' },
        { day: '19 Feb', weekday: 'Thursday' },
        { day: '20 Feb', weekday: 'Friday' },
        { day: '21 Feb', weekday: 'Saturday' },
        { day: '22 Feb', weekday: 'Sunday' },
        { day: '23 Feb', weekday: 'Monday' },
    ];

    const handleConfirmDate = () => {
        if (selectedDate) {
            navigation.navigate('ChooseTimeSlot', {
                doctorId,
                date: selectedDate,
                consultationType,
                price,
            });
        }
    };

    return (
        <View style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View style={[styles.hero, { paddingTop: insets.top + 24 }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <MaterialCommunityIcons
                            name="arrow-left"
                            size={24}
                            color={palette.text}
                        />
                    </TouchableOpacity>
                    <View style={styles.heroText}>
                        <Text style={styles.heroLabel}>Choose Date</Text>
                    </View>
                    <View style={styles.heroDecoration} />
                    <View style={styles.heroDecorationSecondary} />
                </View>

                <View style={styles.doctorInfo}>
                    <Image source={{ uri: doctor?.photo }} style={styles.avatar} />
                    <View>
                        <Text style={styles.doctorName}>{doctor?.name}</Text>
                        <Text style={styles.specialty}>Male-Female Infertility</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Pick Appointment Date</Text>

                <View style={styles.grid}>
                    {dates.map((item, index) => {
                        const isSelected = selectedDate === item.day;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.dateCard, isSelected && styles.dateCardSelected]}
                                onPress={() => setSelectedDate(item.day)}>
                                <Text
                                    style={[
                                        styles.dateText,
                                        isSelected && styles.dateTextSelected,
                                    ]}>
                                    {item.day}
                                </Text>
                                <Text
                                    style={[
                                        styles.weekdayText,
                                        isSelected && styles.weekdayTextSelected,
                                    ]}>
                                    {item.weekday}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.selectedDateContainer}>
                    <MaterialCommunityIcons
                        name="calendar"
                        size={20}
                        color="#304226"
                    />
                    <Text style={styles.selectedDateText}>
                        {selectedDate ? `${selectedDate} 2025` : 'Select a date'}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        !selectedDate && styles.confirmButtonDisabled,
                    ]}
                    disabled={!selectedDate}
                    onPress={handleConfirmDate}>
                    <Text style={styles.confirmButtonText}>Confirm Date</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChooseDateScreen;

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
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: palette.text,
        marginBottom: 16,
        paddingHorizontal: 24,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        paddingHorizontal: 24,
    },
    dateCard: {
        width: '30%',
        backgroundColor: '#F6F7F2',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateCardSelected: {
        backgroundColor: '#304226',
    },
    dateText: {
        fontSize: 15,
        fontWeight: '500',
        color: palette.text,
        marginBottom: 4,
    },
    dateTextSelected: {
        color: '#FFFFFF',
    },
    weekdayText: {
        fontSize: 13,
        color: palette.textMuted,
    },
    weekdayTextSelected: {
        color: 'rgba(255,255,255,0.8)',
    },
    footer: {
        marginTop: 'auto',
        padding: 24,
        paddingBottom: 34,
    },
    selectedDateContainer: {
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
    selectedDateText: {
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
