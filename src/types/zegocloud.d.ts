declare module '@zegocloud/zego-uikit-prebuilt-call-rn' {
    import { Component } from 'react';
    import { ViewStyle } from 'react-native';

    export interface ZegoUIKitPrebuiltCallProps {
        appID: number;
        appSign: string;
        userID: string;
        userName: string;
        callID: string;
        config?: any;
        style?: ViewStyle;
    }

    export default class ZegoUIKitPrebuiltCall extends Component<ZegoUIKitPrebuiltCallProps> { }

    export const ONE_ON_ONE_VIDEO_CALL_CONFIG: any;
    export const ONE_ON_ONE_VOICE_CALL_CONFIG: any;
    export const GROUP_VIDEO_CALL_CONFIG: any;
    export const GROUP_VOICE_CALL_CONFIG: any;
}
