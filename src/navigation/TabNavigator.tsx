import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import SelectConcernScreen from '../screens/SelectConcernScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { palette } from '../theme/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar,
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: '#FFFFFF',
                    tabBarInactiveTintColor: '#A0B890',
                    tabBarLabelStyle: styles.tabLabel,
                }}>
                <Tab.Screen
                    name="Home"
                    component={SelectConcernScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size, focused }) => (
                            <MaterialCommunityIcons
                                name={focused ? 'home' : 'home-outline'}
                                color={color}
                                size={24}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Shop"
                    component={SelectConcernScreen} // Placeholder
                    options={{
                        tabBarLabel: 'Shop',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="store-outline"
                                color={color}
                                size={24}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Consult"
                    component={SelectConcernScreen} // Placeholder for now, or the main flow
                    options={{
                        tabBarLabel: 'Consult',
                        tabBarIcon: ({ color, size }) => (
                            <View style={styles.activeTabIcon}>
                                <MaterialCommunityIcons
                                    name="stethoscope"
                                    color="#FFFFFF"
                                    size={24}
                                />
                            </View>
                        ),
                        tabBarItemStyle: styles.activeTabItem,
                        tabBarActiveTintColor: '#FFFFFF',
                    }}
                />
                <Tab.Screen
                    name="Forum"
                    component={SelectConcernScreen} // Placeholder
                    options={{
                        tabBarLabel: 'Forum',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="leaf" // or leaf-maple, leaf-circle
                                color={color}
                                size={24}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Bulletin"
                    component={MyBookingsScreen} // Using MyBookings here for now
                    options={{
                        tabBarLabel: 'Bulletin',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="bell-outline"
                                color={color}
                                size={24}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
};

export default TabNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    tabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#304226',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        height: 90, // Increased height for better spacing
        paddingBottom: 30, // Adjusted padding
        paddingTop: 10,
        borderTopWidth: 0,
        elevation: 0,
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 4,
        fontWeight: '500',
    },
    activeTabItem: {
        backgroundColor: '#6B8E64', // Sage green from image
        borderRadius: 24, // Squircle shape
        height: 64,
        width: 64,
        marginTop: -5, // Adjusted to be even lower
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTabIcon: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
