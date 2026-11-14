type Listener = (...args: never[]) => unknown;

/**
 * A small typed event emitter.
 *
 * It differs from Node's `EventEmitter` in two ways that matter for a
 * long-lived connection. An `error` nobody listens for does not throw and take
 * the process down. And a listener that throws, or returns a promise that
 * rejects, does not stop the other listeners or the reader: the failure is
 * reported as an `error` event.
 */
export class Emitter<Events extends { [name: string]: unknown[] }> {
  private readonly listeners = new Map<keyof Events, Set<Listener>>();

  /** Add a listener. Returns a function that removes it. */
  on<K extends keyof Events>(name: K, listener: (...args: Events[K]) => unknown): () => void {
    let set = this.listeners.get(name);
    if (!set) {
      set = new Set();
      this.listeners.set(name, set);
    }
    set.add(listener as Listener);
    return () => this.off(name, listener);
  }

  /** Add a listener that runs once. Returns a function that removes it. */
  once<K extends keyof Events>(name: K, listener: (...args: Events[K]) => unknown): () => void {
    const off = this.on(name, (...args: Events[K]) => {
      off();
      return listener(...args);
    });
    return off;
  }

  off<K extends keyof Events>(name: K, listener: (...args: Events[K]) => unknown): void {
    this.listeners.get(name)?.delete(listener as Listener);
  }

  listenerCount(name: keyof Events): number {
    return this.listeners.get(name)?.size ?? 0;
  }

  protected emit<K extends keyof Events>(name: K, ...args: Events[K]): void {
    const set = this.listeners.get(name);
    if (!set || set.size === 0) return;
    for (const listener of [...set]) {
      this.run(name, listener as (...a: Events[K]) => unknown, args);
    }
  }

  /** Run one callback with the same protection listeners get. */
  protected run<K extends keyof Events, A extends unknown[]>(
    source: K,
    callback: (...args: A) => unknown,
    args: A,
  ): void {
    try {
      const result = callback(...args);
      if (result instanceof Promise) {
        result.catch((reason: unknown) => this.listenerFailed(source, reason));
      }
    } catch (reason) {
      this.listenerFailed(source, reason);
    }
  }

  private listenerFailed(source: keyof Events, reason: unknown): void {
    // A failing error listener has nowhere left to report to.
    if (source === 'error') return;
    const error = reason instanceof Error ? reason : new Error(String(reason));
    (this.emit as (name: string, ...args: unknown[]) => void).call(this, 'error', error);
  }
}
