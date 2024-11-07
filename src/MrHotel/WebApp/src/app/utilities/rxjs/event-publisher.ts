import { Subject } from "rxjs";

export class EventPublisher<T> {
  private readonly subject = new Subject<T>();

  public readonly event$ = this.subject.asObservable();

  public emit(value: T): void {
    this.subject.next(value);
  }
}
