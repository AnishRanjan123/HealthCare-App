import React, { useState, useRef } from 'react';
import {
    Image,
    PanResponder,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { palette, shadows } from '../theme/colors';
import { doctors } from '../constants/doctors';

type Props = NativeStackScreenProps<RootStackParamList, 'ConcernDetails'>;

const ConcernDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const { doctorId, date, time, consultationType, price } = route.params;
    const doctor = doctors.find(d => d.id === doctorId);

    const [concern, setConcern] = useState('Diabetes');
    const [severity, setSeverity] = useState('Mild');
    const [duration, setDuration] = useState('23');
    const [durationUnit, setDurationUnit] = useState('Days');
    const [sliderWidth, setSliderWidth] = useState(0);
    const startX = useRef(0);

    const updateSeverity = (x: number) => {
        if (sliderWidth === 0) return;
        // Clamp x between 0 and sliderWidth
        const clampedX = Math.max(0, Math.min(x, sliderWidth));
        const ratio = clampedX / sliderWidth;

        if (ratio < 0.33) {
            setSeverity('Mild');
        } else if (ratio < 0.66) {
            setSeverity('Moderate');
        } else {
            setSeverity('Severe');
        }
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (evt) => {
                startX.current = evt.nativeEvent.locationX;
                updateSeverity(startX.current);
            },
            onPanResponderMove: (evt, gestureState) => {
                const currentX = startX.current + gestureState.dx;
                updateSeverity(currentX);
            },
        })
    ).current;

    const handleProceed = () => {
        if (concern) {
            navigation.navigate('PatientDetails', {
                doctorId,
                date,
                time,
                consultationType,
                price,
                concern,
                severity,
                duration: `${duration} ${durationUnit}`,
            });
        }
    };

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
                    <Text style={styles.heroLabel}>Your Concern</Text>
                </View>
                <View style={styles.heroDecoration} />
                <View style={styles.heroDecorationSecondary} />
            </View>

            <View style={styles.doctorInfo}>
                <Image source={{ uri: doctor?.photo }} style={styles.avatar} />
                <View>
                    <Text style={styles.doctorName}>{doctor?.name}</Text>
                    <Text style={styles.specialty}>Male-Female Infertility</Text>
                    <Text style={styles.subText}>Instant Call - ₹ 15/min</Text>
                </View>
            </View>

            <Text style={styles.label}>Please select a concern</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. Stomach Pain"
                    value={concern}
                    onChangeText={setConcern}
                />
            </View>

            <Text style={styles.label}>Select severity of your concern</Text>
            <View style={styles.severityContainer}>
                <View
                    style={styles.sliderTouchable}
                    onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
                    {...panResponder.panHandlers}>
                    <View style={styles.sliderTrack}>
                        <View
                            style={[
                                styles.sliderFill,
                                severity === 'Mild'
                                    ? { width: '0%' }
                                    : severity === 'Moderate'
                                        ? { width: '50%' }
                                        : { width: '100%' },
                            ]}
                        />
                        <View
                            style={[
                                styles.sliderThumb,
                                severity === 'Mild'
                                    ? { left: '0%' }
                                    : severity === 'Moderate'
                                        ? { left: '50%' }
                                        : { left: '100%' },
                            ]}
                        />
                    </View>
                </View>
                <View style={styles.severityLabels}>
                    <TouchableOpacity onPress={() => setSeverity('Mild')}>
                        <Text
                            style={[
                                styles.severityText,
                                severity === 'Mild' && styles.severityTextActive,
                            ]}>
                            Mild
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSeverity('Moderate')}>
                        <Text
                            style={[
                                styles.severityText,
                                severity === 'Moderate' && styles.severityTextActive,
                            ]}>
                            Moderate
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSeverity('Severe')}>
                        <Text
                            style={[
                                styles.severityText,
                                severity === 'Severe' && styles.severityTextActive,
                            ]}>
                            Severe
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.label}>How long have you been facing?</Text>
            <View style={styles.durationRow}>
                <TextInput
                    style={styles.durationInput}
                    value={duration}
                    onChangeText={setDuration}
                    keyboardType="numeric"
                />
                <MaterialCommunityIcons
                    name="chevron-down"
                    size={24}
                    color={palette.textMuted}
                    style={styles.durationIcon}
                />
            </View>

            <View style={styles.unitRow}>
                {['Days', 'Weeks', 'Months', 'Year'].map(unit => (
                    <TouchableOpacity
                        key={unit}
                        style={styles.radioRow}
                        onPress={() => setDurationUnit(unit)}>
                        <View style={styles.radioOuter}>
                            {durationUnit === unit && <View style={styles.radioInner} />}
                        </View>
                        <Text style={styles.radioLabel}>{unit}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={[styles.proceedButton, !concern && styles.proceedButtonDisabled]}
                disabled={!concern}
                onPress={handleProceed}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
        </View >
    );
};

export default ConcernDetailsScreen;

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
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: palette.text,
        marginBottom: 12,
        marginTop: 16,
        paddingHorizontal: 24,
    },
    inputContainer: {
        paddingHorizontal: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: palette.text,
        backgroundColor: '#FFFFFF',
    },
    severityContainer: {
        marginTop: 12,
        marginBottom: 24,
        paddingHorizontal: 24,
    },
    sliderTouchable: {
        height: 40,
        justifyContent: 'center',
        marginBottom: 16,
        marginHorizontal: 10,
    },
    sliderTrack: {
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        position: 'relative',
    },
    sliderFill: {
        height: 4,
        backgroundColor: '#304226',
        borderRadius: 2,
    },
    sliderThumb: {
        position: 'absolute',
        top: -8,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#304226',
        borderWidth: 2,
        borderColor: '#fff',
        marginLeft: -10,
        ...shadows.card,
    },
    severityLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    severityText: {
        fontSize: 12,
        color: palette.textMuted,
    },
    severityTextActive: {
        color: '#304226',
        fontWeight: '600',
    },
    durationRow: {
        position: 'relative',
        marginBottom: 16,
        paddingHorizontal: 24,
    },
    durationInput: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: palette.text,
        backgroundColor: '#FFFFFF',
    },
    durationIcon: {
        position: 'absolute',
        right: 40,
        top: 16,
    },
    unitRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        paddingHorizontal: 24,
    },
    radioRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#6E7467',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#304226',
    },
    radioLabel: {
        fontSize: 14,
        color: palette.text,
    },
    proceedButton: {
        marginHorizontal: 24,
        marginBottom: 24,
        marginTop: 'auto',
        backgroundColor: '#304226',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    proceedButtonDisabled: {
        backgroundColor: '#ccc',
    },
    proceedButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
