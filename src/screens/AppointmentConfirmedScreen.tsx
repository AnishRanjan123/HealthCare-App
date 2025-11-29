import React from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { palette } from '../theme/colors';
import { doctors } from '../constants/doctors';

type Props = NativeStackScreenProps<RootStackParamList, 'AppointmentConfirmed'>;

const AppointmentConfirmedScreen: React.FC<Props> = ({ navigation, route }) => {
    const { doctorId, date, time, consultationType, price } = route.params;
    const doctor = doctors.find(d => d.id === doctorId);

    const handleMakePayment = () => {
        navigation.navigate('PaymentSuccess', {
            amount: '50', // Mock amount
            doctorId,
            doctorPhoto: doctor?.photo,
        });
    };

    const renderRow = (label: string, value: string) => (
        <View style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.card}>
                <View style={styles.doctorBlock}>
                    <Image source={{ uri: doctor?.photo }} style={styles.avatar} />
                    <View style={styles.verifiedBadge}>
                        <MaterialCommunityIcons name="check" size={16} color="#fff" />
                    </View>
                </View>

                <Text style={styles.title}>Appointment Confirmed</Text>
                <Text style={styles.subtitle}>
                    Thank you for choosing our Experts to help guide you
                </Text>

                {renderRow('Expert', doctor?.name || '')}
                {renderRow('Appointment Date', '23 November 2023')}
                {renderRow('Appointment Time', '17:28 PM')}
                {renderRow('Consultation Type', 'Phone Consultation')}
                {renderRow('Current Wallet Balance', '₹ 660')}
                {renderRow('Consultation Fee', '₹ 50')}

            </View>

            <TouchableOpacity style={styles.paymentButton} onPress={handleMakePayment}>
                <Text style={styles.paymentButtonText}>Make payment</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AppointmentConfirmedScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#E6F0DC',
        borderRadius: 32,
        padding: 24,
        paddingVertical: 80,
        alignItems: 'center',
        marginBottom: 24,
    },
    doctorBlock: {
        position: 'relative',
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 32,
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: -10,
        alignSelf: 'center',
        backgroundColor: '#4CAF50',
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#E6F0DC',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: palette.text,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: palette.textMuted,
        textAlign: 'center',
        marginBottom: 32,
        paddingHorizontal: 20,
        lineHeight: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    rowLabel: {
        fontSize: 14,
        color: palette.textMuted,
    },
    rowValue: {
        fontSize: 14,
        fontWeight: '600',
        color: palette.text,
        textAlign: 'right',
    },
    paymentButton: {
        width: '100%',
        backgroundColor: '#304226',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    paymentButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
