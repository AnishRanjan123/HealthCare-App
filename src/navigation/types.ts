export type RootStackParamList = {
  MainTabs: undefined;
  SelectConcern: undefined;
  DoctorList: {
    concernId: string;
    concernLabel: string;
  };
  CallEnded: {
    doctorName: string;
    doctorPhoto: string;
    duration: string;
    amount: string;
  };
  CallScreen: {
    doctorName: string;
    doctorPhoto: string;
  };
  NoAnswer: {
    doctorName: string;
    doctorPhoto: string;
    specialization: string;
  };
  VideoCall: {
    doctorName: string;
    doctorPhoto: string;
  };
  CallDisconnected: {
    doctorName: string;
    doctorPhoto: string;
    duration: string;
    amount: string;
  };
  AppointmentDetails: {
    doctorName: string;
    doctorPhoto: string;
  };
  MyBookings: undefined;
  ChooseConsultation: {
    doctorId: string;
    doctorName: string;
    doctorPhoto: string;
  };
  ChooseDate: {
    doctorId: string;
    consultationType: string;
    price: string;
  };
  ChooseTimeSlot: {
    doctorId: string;
    date: string;
    consultationType: string;
    price: string;
  };
  ConcernDetails: {
    doctorId: string;
    date: string;
    time: string;
    consultationType: string;
    price: string;
  };
  PatientDetails: {
    doctorId: string;
    date: string;
    time: string;
    consultationType: string;
    price: string;
    concern: string;
    severity: string;
    duration: string;
  };
  AppointmentConfirmed: {
    doctorId: string;
    date: string;
    time: string;
    consultationType: string;
    price: string;
  };
  PaymentSuccess: {
    amount: string;
    doctorId: string;
    doctorPhoto?: string;
  };
};
