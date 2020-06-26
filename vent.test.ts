import { vent } from "./vent";

describe("vent tests", () => {
  test("events that are subscribed to get run", () => {
    const cb = jest.fn();

    const exampleEvent = vent.on("test", cb);
    expect(cb).toBeCalledTimes(0);
    vent.trigger("test");
    expect(cb).toBeCalledTimes(1);
  });

  test("events should unsubscribe", () => {
    const cb = jest.fn();

    const exampleEvent = vent.on("test", cb);

    expect(cb).toBeCalledTimes(0);
    vent.off(exampleEvent);
    expect(cb).toBeCalledTimes(0);
    vent.trigger("test");
    expect(cb).toBeCalledTimes(0);
  });

  test("events that are subscribed to with multiple callbacks", () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    vent.on("test", cb1);
    vent.on("test", cb2);
    expect(cb1).toBeCalledTimes(0);
    expect(cb2).toBeCalledTimes(0);
    vent.trigger("test");
    expect(cb1).toBeCalledTimes(1);
    expect(cb2).toBeCalledTimes(1);
  });

  test("error is thrown when event does not exist", () => {
    expect(() => vent.trigger("random name")).toThrowError();
  });
});
