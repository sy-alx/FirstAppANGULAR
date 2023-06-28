Le but de l'exercice est de d'avoir un enregistreur de frappe avec une `pipe` et `subscribe - unsubscribe`

Code de base récupé : 



`
import { fromEvent, switchMap, tap, interval, take } from 'rxjs';

const source$ = fromEvent(document, 'click');
const result$ = source$.pipe(
  switchMap((_, i) => i % 2 === 0
    ? fromEvent(document, 'mousemove').pipe(
        tap({
          subscribe: () => console.log('Subscribed to the mouse move events after click #' + i),
          unsubscribe: () => console.log('Mouse move events #' + i + ' unsubscribed'),
          finalize: () => console.log('Mouse move events #' + i + ' finalized')
        })
      )
    : interval(1_000).pipe(
        take(5),
        tap({
          subscribe: () => console.log('Subscribed to the 1-second interval events after click #' + i),
          unsubscribe: () => console.log('1-second interval events #' + i + ' unsubscribed'),
          finalize: () => console.log('1-second interval events #' + i + ' finalized')
        })
      )
  )
);

const subscription = result$.subscribe({
  next: console.log
});

setTimeout(() => {
  console.log('Unsubscribe after 60 seconds');
  subscription.unsubscribe();
}, 60_000);
`