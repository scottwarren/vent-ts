/**
 * A simple event emitter class
 */
export class Vent {
  /** internal store of the callbacks. Keyed by the eventName. */
  callbacks: Record<string, Function[]>

  constructor() {
    this.callbacks = {}
  }

  /**
   *
   * @param eventName
   * @param callback
   */
  on = (eventName: string, callback: Function) => {
    if (!this.hasEvent(eventName)) {
      this.callbacks[eventName] = []
    }

    this.callbacks[eventName] = [...this.callbacks[eventName], callback]

    // use this as an ID to unsubscribe
    return {
      eventName,
      eventPosition: this.callbacks[eventName].length - 1,
    }
  }

  /**
   * checks whether an event is bound for eventName
   * @param eventName name of the event
   * @return whether or not the event exists
   */
  hasEvent = (eventName: string) => {
    return !!this.callbacks[eventName] && this.callbacks[eventName].length > 0
  }

  /**
   * used to unsubscribe a single event subscription
   */
  off = (eventToRemove: VentEvent) => {
    this.callbacks[eventToRemove.eventName] = [
      ...this.callbacks[eventToRemove.eventName].splice(
        0,
        eventToRemove.eventPosition,
      ),
      ...this.callbacks[eventToRemove.eventName].splice(
        eventToRemove.eventPosition + 1,
      ),
    ]
  }

  /**
   * used to trigger an event, and all subscribed callbacks
   *
   * To pass arguments to the callback, pass them in as additional arguments
   */
  trigger = (eventName: string, ...args: unknown[]) => {
    if (!this.hasEvent(eventName)) {
      // Event does not exist, nothing to call
      return
    }

    this.callbacks[eventName].map((callback) => {
      callback.apply(null, args)
    })
  }
}
