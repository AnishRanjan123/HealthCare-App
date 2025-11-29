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
import { palette, shadows } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'ChooseConsultation'>;

const ChooseConsultationScreen: React.FC<Props> = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const { doctorId, doctorName, doctorPhoto } = route.params;
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const consultationTypes = [
        {
            id: 'phone',
            label: 'Phone Consultation',
            price: '₹ 15/min',
            duration: '(20min)',
            icon: 'phone-outline',
        },
        {
            id: 'video',
            label: 'Video Consultation',
            price: '₹ 35/min',
            duration: '(20min)',
            icon: 'video-outline',
        },
        {
            id: 'chat',
            label: 'Chat Consultation',
            price: '₹ 50',
            duration: '(30 conversation texts)\nValid: 72 hours',
            icon: 'message-text-outline',
        },
    ];

    const handleProceed = () => {
        if (selectedType) {
            const selectedOption = consultationTypes.find(t => t.id === selectedType);
            navigation.navigate('ChooseDate', {
                doctorId,
                consultationType: selectedOption?.label || '',
                price: selectedOption?.price || '',
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
                    <Text style={styles.heroLabel}>Choose Consultation</Text>
                </View>
                <View style={styles.heroDecoration} />
                <View style={styles.heroDecorationSecondary} />
            </View>

            <View style={styles.doctorInfo}>
                <Image source={{ uri: doctorPhoto }} style={styles.avatar} />
                <View>
                    <Text style={styles.doctorName}>{doctorName}</Text>
                    <Text style={styles.specialty}>Male-Female Infertility</Text>
                </View>
            </View>

            <View style={styles.optionsContainer}>
                {consultationTypes.map(type => {
                    const isSelected = selectedType === type.id;
                    return (
                        <TouchableOpacity
                            key={type.id}
                            style={[styles.card, isSelected && styles.cardSelected]}
                            onPress={() => setSelectedType(type.id)}>
                            <Text style={styles.cardLabel}>{type.label}</Text>
                            <Text style={styles.cardPrice}>{type.price}</Text>
                            <Text style={styles.cardDuration}>{type.duration}</Text>
                            <View
                                style={[
                                    styles.radioButton,
                                    isSelected && styles.radioButtonSelected,
                                ]}>
                                {isSelected && (
                                    <MaterialCommunityIcons
                                        name="check"
                                        size={16}
                                        color="#fff"
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <TouchableOpacity
                style={[
                    styles.proceedButton,
                    !selectedType && styles.proceedButtonDisabled,
                ]}
                disabled={!selectedType}
                onPress={handleProceed}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChooseConsultationScreen;

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
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        paddingHorizontal: 24,
    },
    card: {
        width: '47%', // Approx half width minus gap
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F5F5F5',
        ...shadows.card,
    },
    cardSelected: {
        borderColor: 'transparent',
    },
    cardLabel: {
        fontSize: 13,
        color: palette.text,
        marginBottom: 12,
        fontWeight: '500',
    },
    cardPrice: {
        fontSize: 20,
        fontWeight: '700',
        color: palette.text,
        marginBottom: 4,
    },
    cardDuration: {
        fontSize: 13,
        color: palette.text,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 18,
    },
    radioButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    radioButtonSelected: {
        backgroundColor: '#4A6B41',
        borderColor: '#4A6B41',
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
