
export type EventDefinition = Record<string, unknown[]>;
export type EventKey<T extends EventDefinition> = string & keyof T;
export type EventListener<T extends unknown[]> = (...params: T) => void;

export class EventEmitter<T extends EventDefinition> {
  private events = new Map<string, unknown[]>();

  public emit<K extends EventKey<T>> (event: K, ...params: T[K]): void {
    const events = this.events.get(event) as EventListener<T[K]>[] | undefined;

    if (events) {
      events.forEach((event) => event(...params));
    }
  }

  public suscribe<K extends EventKey<T>> (eventKey: K, event: EventListener<T[K]>): () => void {
    const events = this.events.get(eventKey) ?? [];

    events.push(event);

    this.events.set(eventKey, events);

    return (): void => { this.unsuscribe(eventKey, event); };
  }

  public unsuscribe<K extends EventKey<T>> (eventKey: K, event: EventListener<T[K]>): boolean {
    const events = this.events.get(eventKey);

    if (!events) {
      return false;
    }

    const updatedEvents = events.filter((e) => e !== event);

    this.events.set(eventKey, updatedEvents);

    return updatedEvents.length !== events.length;
  }
}
