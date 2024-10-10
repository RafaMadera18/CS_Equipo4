import { BehaviorSubject, Observable, switchMap, tap } from "rxjs";

export class ObservableCollection<T> {
  private readonly subject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  public readonly items$: Observable<T[]> = this.subject.asObservable();

  public getItems(): readonly T[] {
    return this.subject.value;
  }

  public load(observable: Observable<T[]>): Observable<T[]> {
    return observable.pipe(
      tap((items) => this.subject.next(items)),
      switchMap(() => this.items$),
    );
  }

  public add(item: T): void {
    this.subject.next([...this.subject.value, item]);
  }

  public removeAt(index: number): void {
    this.subject.value.splice(index, 1);
    this.subject.next(this.subject.value);
  }
}
