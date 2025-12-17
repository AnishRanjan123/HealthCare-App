import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/types';
import TabNavigator from './src/navigation/TabNavigator';
import DoctorListScreen from './src/screens/DoctorListScreen';
import CallScreen from './src/screens/CallScreen';
import VideoCallScreen from './src/screens/VideoCallScreen';
import CallEndedScreen from './src/screens/CallEndedScreen';
import AppointmentDetailsScreen from './src/screens/AppointmentDetailsScreen';
import CallDisconnectedScreen from './src/screens/CallDisconnectedScreen';
import NoAnswerScreen from './src/screens/NoAnswerScreen';
import ChooseConsultationScreen from './src/screens/ChooseConsultationScreen';
import ChooseDateScreen from './src/screens/ChooseDateScreen';
import ChooseTimeSlotScreen from './src/screens/ChooseTimeSlotScreen';
import ConcernDetailsScreen from './src/screens/ConcernDetailsScreen';
import PatientDetailsScreen from './src/screens/PatientDetailsScreen';
import AppointmentConfirmedScreen from './src/screens/AppointmentConfirmedScreen';
import PaymentSuccessScreen from './src/screens/PaymentSuccessScreen';
import MyBookingsScreen from './src/screens/MyBookingsScreen';
import { CallOverlayProvider } from './src/provider/CallOverlayProvider';


const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <CallOverlayProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="MainTabs">
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="DoctorList" component={DoctorListScreen} />
            <Stack.Screen name="VideoCall" component={VideoCallScreen} />
            <Stack.Screen name="CallEnded" component={CallEndedScreen} />
            <Stack.Screen
              name="AppointmentDetails"
              component={AppointmentDetailsScreen}
            />
            <Stack.Screen
              name="CallDisconnected"
              component={CallDisconnectedScreen}
            />
            <Stack.Screen name="NoAnswer" component={NoAnswerScreen} />
            <Stack.Screen
              name="ChooseConsultation"
              component={ChooseConsultationScreen}
            />
            <Stack.Screen name="ChooseDate" component={ChooseDateScreen} />
            <Stack.Screen
              name="ChooseTimeSlot"
              component={ChooseTimeSlotScreen}
            />
            <Stack.Screen
              name="ConcernDetails"
              component={ConcernDetailsScreen}
            />
            <Stack.Screen
              name="PatientDetails"
              component={PatientDetailsScreen}
            />
            <Stack.Screen
              name="AppointmentConfirmed"
              component={AppointmentConfirmedScreen}
            />
            <Stack.Screen
              name="PaymentSuccess"
              component={PaymentSuccessScreen}
            />
            <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
            <Stack.Screen name="CallScreen" component={CallScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </CallOverlayProvider>
    </SafeAreaProvider>
  );
}

export default App;
