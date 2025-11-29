import React, { useState } from 'react';
import {
    Image,
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
import { palette } from '../theme/colors';
import { doctors } from '../constants/doctors';

type Props = NativeStackScreenProps<RootStackParamList, 'PatientDetails'>;

const PatientDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const {
        doctorId,
        date,
        time,
        consultationType,
        price,
        concern,
        severity,
        duration,
    } = route.params;
    const doctor = doctors.find(d => d.id === doctorId);

    const [gender, setGender] = useState('Prefer not to say');
    const [age, setAge] = useState('24 years');
    const [height, setHeight] = useState('171 cms');
    const [weight, setWeight] = useState('63 kg');

    const handleConfirm = () => {
        navigation.navigate('AppointmentConfirmed', {
            doctorId,
            date,
            time,
            consultationType,
            price,
        });
    };

    const renderInput = (label: string, value: string, setValue: (v: string) => void) => (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
            />
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
                    <Text style={styles.heroLabel}>Basic Info</Text>
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

            <Text style={styles.sectionTitle}>Please confirm your basic information</Text>

            {renderInput('Gender', gender, setGender)}
            {renderInput('Age', age, setAge)}
            {renderInput('Height', height, setHeight)}
            {renderInput('Weight', weight, setWeight)}

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PatientDetailsScreen;

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
        marginBottom: 24,
        paddingHorizontal: 24,
    },
    inputContainer: {
        marginBottom: 16,
        marginHorizontal: 24,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#FFFFFF',
    },
    inputLabel: {
        fontSize: 12,
        color: palette.textMuted,
        marginBottom: 4,
    },
    input: {
        fontSize: 16,
        color: palette.text,
        padding: 0,
    },
    confirmButton: {
        marginHorizontal: 24,
        marginBottom: 24,
        marginTop: 'auto',
        backgroundColor: '#304226',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
