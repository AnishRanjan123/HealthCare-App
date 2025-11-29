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

type Props = NativeStackScreenProps<RootStackParamList, 'PaymentSuccess'>;

const PaymentSuccessScreen: React.FC<Props> = ({ navigation, route }) => {
    const { amount, doctorId, doctorPhoto } = route.params;
    const doctor = doctors.find(d => d.id === doctorId);
    const displayPhoto = doctorPhoto || doctor?.photo || 'https://randomuser.me/api/portraits/men/32.jpg';

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.content}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: displayPhoto }}
                        style={styles.avatar}
                    />
                    <View style={styles.checkBadge}>
                        <MaterialCommunityIcons name="check" size={24} color="#fff" />
                    </View>
                </View>

                <Text style={styles.title}>Paid ₹{amount}</Text>
                <Text style={styles.subtitle}>Chat Consultation Booked Successfully</Text>

                <View style={styles.balanceContainer}>
                    <MaterialCommunityIcons name="wallet-outline" size={24} color={palette.textMuted} />
                    <View style={styles.balanceTextContainer}>
                        <Text style={styles.balanceLabel}>Available Balance</Text>
                        <Text style={styles.balanceValue}>₹ 660</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('MyBookings')}
            >
                <Text style={styles.buttonText}>Check Bookings</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#E6F0DC', // Light green background
        padding: 20,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -60, // Adjust to center visually like the design
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    checkBadge: {
        position: 'absolute',
        bottom: -5,
        alignSelf: 'center',
        backgroundColor: '#4CAF50',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: '#E6F0DC',
    },
    title: {
        fontSize: 28,
        fontWeight: '400',
        color: palette.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: palette.text,
        marginBottom: 40,
        textAlign: 'center',
    },
    balanceContainer: {
        alignItems: 'center',
        gap: 8,
    },
    balanceTextContainer: {
        alignItems: 'center',
    },
    balanceLabel: {
        fontSize: 12,
        color: palette.textMuted,
        marginBottom: 4,
    },
    balanceValue: {
        fontSize: 32,
        fontWeight: '600',
        color: palette.text,
    },
    button: {
        backgroundColor: '#304226',
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
