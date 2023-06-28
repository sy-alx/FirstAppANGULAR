```
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  title$ = new Observable(observer => {
    setInterval(() => {
      observer.next();
    }, 2000);
  });

  constructor() {
    this.title$.subscribe(this.setTitle);
  }

  private setTitle = () => {
    const timestamp = new Date().getMilliseconds();
    this.title = `Learning Angular (${timestamp})`;
  }

  private changeTitle(callback: Function) {
    setTimeout(() => {
      callback();
    }, 2000);
  }

  private onComplete() {
    return new Promise<void>(resolve => {
      setInterval(() => {
        resolve();
      }, 2000);
    });
  }

}
```



Ce code définit un composant Angular appelé `AppComponent`. Le composant est identifié par le sélecteur 'app-root', qui est utilisé dans le template HTML d'Angular pour inclure ce composant dans une page. Il utilise aussi un template HTML et un fichier de style CSS spécifiques qui sont définis respectivement dans './app.component.html' et './app.component.css'.

Le composant `AppComponent` a quatre membres principaux : `title`, `title$`, `setTitle`, et `changeTitle`.

- `title`: C'est une variable de type `string` qui contient le titre à afficher. Sa valeur initiale est 'my-app'.

- `title$`: C'est un `Observable`. Il commence à émettre des valeurs dès que le composant est créé, en raison de la méthode `subscribe` dans le constructeur. Les valeurs émises sont produites par la fonction `setInterval` qui est appelée toutes les 2 secondes.

- `setTitle`: C'est une méthode qui est appelée chaque fois que `title$` émet une valeur. Cette méthode met à jour la valeur de `title` avec une nouvelle chaîne qui contient un timestamp.

- `changeTitle`: C'est une méthode qui prend une fonction de rappel et l'appelle après un délai de 2 secondes.

- `onComplete`: C'est une méthode qui renvoie une `Promise` qui est résolue toutes les 2 secondes.

Notez que les Observables et les Promises sont deux concepts importants pour gérer les opérations asynchrones en JavaScript. Les Promises sont des opérations "one-shot", elles ne peuvent pas être annulées et elles renvoient qu'une seule valeur. D'un autre côté, les Observables peuvent émettre plusieurs valeurs au fil du temps, peuvent être annulés et les "observers" (ou les "subscribers") peuvent s'abonner à eux pour recevoir les valeurs émises



