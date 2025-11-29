import React, { useState } from 'react';
import {
    FlatList,
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
import { palette, shadows } from '../theme/colors';
import { doctors } from '../constants/doctors';

type Props = NativeStackScreenProps<RootStackParamList, 'MyBookings'>;

const MyBookingsScreen: React.FC<Props> = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [activeTab, setActiveTab] = useState<'Appointments' | 'Orders'>('Appointments');

    const appointments = [
        {
            id: '1',
            doctorName: doctors[0].name,
            specialty: 'Orthodontist',
            status: 'Upcoming',
            date: 'Tuesday, 13/09/2023',
            time: '10:30 AM',
            photo: doctors[0].photo,
            hasPrescription: true,
        },
        {
            id: '2',
            doctorName: 'Dr. Deepa Godara',
            specialty: 'Orthodontist',
            status: 'Completed',
            date: 'Tuesday, 13/09/2023',
            time: '10:30 AM',
            photo: 'https://randomuser.me/api/portraits/men/36.jpg',
            hasPrescription: false,
        },
    ];

    const renderAppointmentCard = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.doctorName}>{item.doctorName}</Text>
                    <View style={styles.specialtyRow}>
                        <Text style={styles.specialty}>{item.specialty}</Text>
                        <View style={[
                            styles.statusBadge,
                            item.status === 'Upcoming' ? styles.statusUpcoming : styles.statusCompleted
                        ]}>
                            <Text style={[
                                styles.statusText,
                                item.status === 'Upcoming' ? styles.statusTextUpcoming : styles.statusTextCompleted
                            ]}>{item.status}</Text>
                        </View>
                    </View>
                </View>
                <Image source={{ uri: item.photo }} style={styles.avatar} />
            </View>

            <View style={styles.dateTimeRow}>
                <View style={styles.dateTimeItem}>
                    <MaterialCommunityIcons name="calendar-blank-outline" size={16} color="#4A6B41" />
                    <Text style={styles.dateTimeText}>{item.date}</Text>
                </View>
                <View style={styles.dateTimeItem}>
                    <MaterialCommunityIcons name="clock-outline" size={16} color="#4A6B41" />
                    <Text style={styles.dateTimeText}>{item.time}</Text>
                </View>
            </View>

            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={styles.viewDetailsButton}
                    onPress={() => navigation.navigate('AppointmentDetails', {
                        doctorName: item.doctorName,
                        doctorPhoto: item.photo,
                    })}
                >
                    <Text style={styles.viewDetailsText}>View Details</Text>
                </TouchableOpacity>
                {item.status === 'Upcoming' && (
                    <TouchableOpacity style={styles.startCallButton} onPress={handleStartCall}>
                        <Text style={styles.startCallText}>Start Call</Text>
                    </TouchableOpacity>
                )}
            </View>

            {item.hasPrescription && (
                <TouchableOpacity style={styles.prescriptionBanner}>
                    <View>
                        <Text style={styles.prescriptionTitle}>Check Prescription</Text>
                        <Text style={styles.prescriptionSubtitle}>Dr. Deepa has suggested some solution</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={palette.text} />
                </TouchableOpacity>
            )}
        </View>
    );

    const [showDisclaimer, setShowDisclaimer] = useState(false);

    const handleStartCall = () => {
        setShowDisclaimer(true);
    };

    const handleProceed = () => {
        setShowDisclaimer(false);
        // Navigate to call screen
        navigation.navigate('CallScreen', {
            doctorName: doctors[0].name,
            doctorPhoto: doctors[0].photo,
        });
    };

    return (
        <View style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color={palette.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Bookings</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Appointments' && styles.activeTab]}
                    onPress={() => setActiveTab('Appointments')}
                >
                    <Text style={[styles.tabText, activeTab === 'Appointments' && styles.activeTabText]}>Appointments</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Orders' && styles.activeTab]}
                    onPress={() => setActiveTab('Orders')}
                >
                    <Text style={[styles.tabText, activeTab === 'Orders' && styles.activeTabText]}>Orders</Text>
                </TouchableOpacity>
            </View>

            {/* Filter */}
            <View style={styles.filterRow}>
                <Text style={styles.filterLabel}>Filter Appointments</Text>
                <MaterialCommunityIcons name="filter-variant" size={20} color={palette.text} />
            </View>

            {/* List */}
            <FlatList
                data={appointments}
                renderItem={renderAppointmentCard}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {/* Disclaimer Modal */}
            {showDisclaimer && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHandle} />
                        <Text style={styles.modalTitle}>Disclaimer</Text>
                        <Text style={styles.modalText}>
                            By continuing, you consent to this call being recorded for quality and support purposes. Please provide accurate details to help the doctor assist you effectively. <Text style={styles.linkText}>Read Terms & Conditions...</Text>
                        </Text>
                        <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                            <Text style={styles.proceedButtonText}>Proceed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setShowDisclaimer(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default MyBookingsScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#E6F0DC',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        marginBottom: 20,
        minHeight: 180,
    },
    backButton: {
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '400',
        color: palette.text,
    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 10,
    },
    activeTab: {
        backgroundColor: '#1A1A1A',
    },
    tabText: {
        fontSize: 14,
        color: '#666666',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
        gap: 8,
    },
    filterLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: palette.text,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        ...shadows.card,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: '600',
        color: palette.text,
        marginBottom: 4,
    },
    specialtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    specialty: {
        fontSize: 13,
        color: palette.textMuted,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusUpcoming: {
        backgroundColor: '#FEF3E7',
    },
    statusCompleted: {
        backgroundColor: '#E6F0DC',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    statusTextUpcoming: {
        color: '#D97706',
    },
    statusTextCompleted: {
        color: '#304226',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 12,
    },
    dateTimeRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },
    dateTimeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dateTimeText: {
        fontSize: 13,
        color: palette.textMuted,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    viewDetailsButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewDetailsText: {
        color: '#304226',
        fontWeight: '600',
        fontSize: 14,
    },
    startCallButton: {
        flex: 1,
        backgroundColor: '#304226',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    startCallText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    prescriptionBanner: {
        backgroundColor: '#EAE6F0',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    prescriptionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: palette.text,
        marginBottom: 2,
    },
    prescriptionSubtitle: {
        fontSize: 12,
        color: palette.textMuted,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    modalHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: palette.text,
        marginBottom: 16,
    },
    modalText: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 22,
    },
    linkText: {
        color: '#304226',
        fontWeight: '600',
    },
    proceedButton: {
        width: '100%',
        backgroundColor: '#304226',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 12,
    },
    proceedButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButton: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#304226',
    },
    cancelButtonText: {
        color: '#304226',
        fontSize: 16,
        fontWeight: '600',
    },
});
