interface VentEvent {
  eventName: string;
  eventPosition: number;
}

type Callbacks = {
  [key: string]: Function[];
};

interface Vent {
  /**
   * contains all of the callbacks for all events, the key is the event name
   */
  callbacks: Callbacks;
  on: (eventName: string, callback: Function) => VentEvent;
  hasEvent: (eventName: string) => boolean;
  off: (event: VentEvent) => void;
  trigger: (eventName: string) => void;
}
