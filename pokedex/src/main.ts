import { fromEvent, tap } from 'rxjs';

const source$ = fromEvent(document, 'keydown');
const result$ = source$.pipe(
  tap((event: Event) => {
    if (event instanceof KeyboardEvent) {
      console.log('Key pressed: ' + event.key);
    }
  })
);

const subscription = result$.subscribe();

setTimeout(() => {
  console.log('Unsubscribe after 60 seconds');
  subscription.unsubscribe();
}, 60_000);
