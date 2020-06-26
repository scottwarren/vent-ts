"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vent = void 0;
exports.vent = {
    callbacks: {},
    on: function (eventName, callback) {
        if (!this.hasEvent(eventName)) {
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(callback);
        // use this as an ID to unsubscribe
        return {
            eventName: eventName,
            eventPosition: this.callbacks[eventName].length - 1,
        };
    },
    /**
     * checks whether an event is bound for eventName
     * @param  {string} eventName name of the event
     * @return {Boolean}          Boolean whether or not the event exists
     */
    hasEvent: function (eventName) {
        return (typeof this.callbacks[eventName] !== "undefined" &&
            this.callbacks[eventName].length > 0);
    },
    /**
     * used to unsubscribe a single event subscription
     */
    off: function (eventToRemove) {
        this.callbacks[eventToRemove.eventName].splice(eventToRemove.eventPosition, 1);
    },
    /**
     * used to trigger an event, and all subscribed callbacks
     */
    trigger: function (eventName) {
        var _this = this;
        // convert arguments into a 'real' array
        var args = Array.prototype.slice.call(arguments);
        // remove the eventName argument from our new array
        args = args.slice(1);
        if (!this.hasEvent(eventName)) {
            throw new Error("No event bound for " + eventName);
        }
        this.callbacks[eventName].map(function (callback) {
            callback.apply(_this, args);
        });
    },
};
