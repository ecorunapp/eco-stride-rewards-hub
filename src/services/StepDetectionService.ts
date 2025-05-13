
/**
 * Step Detection Service using device motion sensors
 */
export class StepDetectionService {
  private sensitivity = 1.1; // Threshold for step detection
  private stepCount = 0;
  private lastMagnitude = 0;
  private isListening = false;
  private listeners: ((steps: number) => void)[] = [];
  private lastStepTime = 0;
  private minStepInterval = 250; // Minimum milliseconds between steps to avoid counting bounces
  
  constructor() {
    this.handleDeviceMotion = this.handleDeviceMotion.bind(this);
  }
  
  /**
   * Start listening for steps using device motion API
   */
  public startListening(): boolean {
    if (this.isListening) return true;
    
    if (typeof window !== 'undefined' && 
        typeof window.DeviceMotionEvent !== 'undefined' && 
        typeof window.DeviceMotionEvent.requestPermission === 'function') {
      // iOS 13+ requires permission
      window.DeviceMotionEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            this.addListener();
          } else {
            console.log('Motion sensor permission denied');
            return false;
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS or older iOS
      this.addListener();
    }
    
    return true;
  }
  
  /**
   * Stop listening for steps
   */
  public stopListening(): void {
    if (!this.isListening) return;
    
    window.removeEventListener('devicemotion', this.handleDeviceMotion);
    this.isListening = false;
    console.log('Step detection stopped');
  }
  
  /**
   * Reset step count to zero
   */
  public resetSteps(): void {
    this.stepCount = 0;
    this.notifyListeners();
  }
  
  /**
   * Add a callback function to be called when step count changes
   */
  public addStepListener(callback: (steps: number) => void): void {
    this.listeners.push(callback);
  }
  
  /**
   * Remove a previously added callback
   */
  public removeStepListener(callback: (steps: number) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }
  
  /**
   * Get current step count
   */
  public getStepCount(): number {
    return this.stepCount;
  }
  
  /**
   * Handle device motion events
   */
  private handleDeviceMotion(event: DeviceMotionEvent): void {
    if (!event.acceleration) return;
    
    const { x = 0, y = 0, z = 0 } = event.acceleration;
    
    // Calculate the magnitude of acceleration
    const magnitude = Math.sqrt(x*x + y*y + z*z);
    
    // Check if this is a step based on acceleration changes
    if (this.lastMagnitude > 0 && 
        magnitude > this.sensitivity && 
        this.lastMagnitude < this.sensitivity) {
      
      const now = Date.now();
      
      // Make sure enough time has passed since the last step
      if (now - this.lastStepTime > this.minStepInterval) {
        this.stepCount++;
        this.lastStepTime = now;
        this.notifyListeners();
      }
    }
    
    this.lastMagnitude = magnitude;
  }
  
  /**
   * Add device motion event listener
   */
  private addListener(): void {
    window.addEventListener('devicemotion', this.handleDeviceMotion);
    this.isListening = true;
    console.log('Step detection started');
  }
  
  /**
   * Notify all listeners about step count change
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.stepCount));
  }
  
  /**
   * Use a fallback method for step counting when sensors aren't available
   * This simulates steps for testing or when device doesn't support motion sensors
   */
  public startSimulation(): void {
    if (this.isListening) return;
    
    // Simulate random steps every 1-2 seconds
    const simulationInterval = setInterval(() => {
      if (!this.isListening) {
        clearInterval(simulationInterval);
        return;
      }
      
      this.stepCount += Math.floor(Math.random() * 3) + 1;
      this.notifyListeners();
    }, 1000 + Math.random() * 1000);
    
    this.isListening = true;
    console.log('Step simulation started (fallback mode)');
  }
}

// Create a singleton instance
export const stepDetectionService = new StepDetectionService();
