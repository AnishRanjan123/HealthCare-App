import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { palette } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'CallEnded'>;

const CallEndedScreen: React.FC<Props> = ({ navigation, route }) => {
    const { doctorName, doctorPhoto, duration, amount } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.walletText}>₹ 150</Text>
                    <MaterialCommunityIcons name="wallet-outline" size={20} color={palette.textMuted} />
                </View>

                <View style={styles.centerContent}>
                    <Image source={{ uri: doctorPhoto }} style={styles.avatar} />
                    <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>{doctorName}</Text>
                        <View style={styles.statusDot} />
                    </View>

                    <View style={styles.statusRow}>
                        <MaterialCommunityIcons name="chart-bar" size={20} color="#7ED957" />
                        <Text style={styles.statusText}>Call Ended</Text>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <MaterialCommunityIcons name="phone-outline" size={24} color={palette.textMuted} />
                            <Text style={styles.statLabel}>Consultation Duration</Text>
                            <Text style={styles.statValue}>{duration}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <MaterialCommunityIcons name="wallet-outline" size={24} color={palette.textMuted} />
                            <Text style={styles.statLabel}>Total Amount Deducted</Text>
                            <Text style={styles.statValue}>{amount}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.outlineButton}
                        onPress={() => navigation.navigate('DoctorList', { concernId: '1', concernLabel: 'General Physician' })} // Navigate back to list or call again logic
                    >
                        <Text style={styles.outlineButtonText}>Call Again</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('MainTabs')}
                    >
                        <Text style={styles.primaryButtonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 8,
    },
    walletText: {
        fontSize: 16,
        fontWeight: '600',
        color: palette.text,
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -40, // Adjust visual center
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 20,
        marginBottom: 16,
    },
    doctorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 24,
    },
    doctorName: {
        fontSize: 20,
        fontWeight: '700',
        color: palette.text,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#7ED957',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 48,
    },
    statusText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#3E6452', // Darker green
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
    },
    statItem: {
        alignItems: 'center',
        gap: 8,
    },
    statLabel: {
        fontSize: 12,
        color: palette.textMuted,
        marginTop: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '600',
        color: palette.text,
    },
    footer: {
        gap: 16,
        marginBottom: 20,
    },
    outlineButton: {
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#7ED957',
        alignItems: 'center',
    },
    outlineButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3E6452',
    },
    primaryButton: {
        backgroundColor: '#3E6452',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

export default CallEndedScreen;
