
/// <reference types="vite/client" />

// Extend DeviceMotionEvent with iOS permission API
interface DeviceMotionEventIOS extends DeviceMotionEvent {
  requestPermission?: () => Promise<"granted" | "denied">;
}

interface DeviceMotionEventConstructorIOS extends DeviceMotionEventConstructor {
  requestPermission?: () => Promise<"granted" | "denied">;
}

// Add iOS support to global window
interface Window {
  DeviceMotionEvent: DeviceMotionEventConstructorIOS;
}
