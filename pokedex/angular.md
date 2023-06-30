cette directive permet d'agir sur le style d'un élément : 
``` html
<p [ngStyle]="{color: color}"> Bulbizar <p>

```

Cette directive permet de modififier dynamique un classe sur un element

``` html

<div [class.someClass]="isStyleWithSomeClass()"> Ng Class ! </div>

```

## Résumé

On peut utiliser tout un tas de symbole afin d'intéragir avec le template : 
    {{}} pour afficher le contenue de variable ng ou directive qui comment par * 
    [] pour le binding de proprièetes 
    création de varible locales avec #
    usage des selecteurs pour imbriquer les tempaltes de composants



Angular nous permet de nous greffer (avec le code) a des moments cles du cycle de vie du composant : 
    ngOInit : est appele une fois après le chargement du composant, idéal lorsqu'on souhaite effectuer des initialisations.
    ngOnDestroy : est appel a la destruction du composant
    ngOnchange 
    

## Manipuler les données avec les Pipes

Les pipes nous permettent de transformer nos donéées au niveau de la vue; Leur fonctionnement est très simple, il fonctionne en prenant les valeurs de nos expressions en input et en affichant la sortie directement au niveau du template. 

La syntaxe est aussi simple, on palce le nom de notre `pipe` après l'expression que que l'on souhaite modifier en les séparant par le symbole : `|` On combine souvent (très souvent) les pipents avec `l'interpolation` et on peut les chainer.

## introduction a RxJS

Ici nous allons traiter de la gestion des operations asynchrones, il s'agit de taches recontrées fréquement pour les développeurs.
RxJs est une librairie javascript qui fournit des methodes pour manipuler des flux de données en utilisant des observables.

les fonctionnalités intrinsèques d'angular dépendent relativement peu de RxJS, en revanche des packages comme le router ou le client http d'angular sont etroitement liés aux observables.



## les promesses 
elles ne peuvent pas etre annulées
elles sont immédiatement executées
ce sont des operations "one shot"
elles ne renvoient qu'une valeur 


## gestion des opérations asynchrones


## les observables 
Un observable est un ibjet qui maintient une lste de dépedendants, appelés observers et qui les informe a propos de changements d'etat et de données en emettant des evenements de facons asynchrone.

Pour cela les observables sont équipés de toute la machinerie necessaire pour produire et émettre ce genre d'evenements
Ils peuvent etre déclenchés et annulés à tout moment, et cela peu importe si les donnéees attendues ont déja été  émises.

Les observes ont besoin de s'abonner à un observale afin d'etre notifie et de reagir à des changements d'etat.

On appelle ce procédé "le pattern observer", il permet de mettre en place des operations concurrents et de la logique très ava,cée.

ces "observers" sont aussi appelés 'subscribers', continueront d'ecouter tout ce qui se passera au niveau de l'observable jusqu'à que ce dernier soit détruit.

## Communiquer avec  des services qui utilisent http

- le but : 
    - Envoyer / recevoir des donnees avec le protocole http
    - decouvrir le client http d'Angular
    - (mettre en place un backEnd)
    - gerer les opérations CRUD avec Angular

## Les formulaires 

Le framework Angular propose deux approches pour les formulaires : `template-driven` et `reactive`,
Aucune de ces deux approches ne peut être considérés comme meilleure,
la grande différence reside dans la façon dont sont gérées les données : 


• `Template-driven` : les formulaires sont faciles à mettre en place, la creation se fait par le template, c'est aussi
te cas pour la mise en place de regue de validation. Ils sont difficiles a tester, leur fonctionnement depend est base
sur les mecanismes de detection de changement du framework
`Reactive forms`: ils sont plus robustes et adaptés lorsqu'on traite des données complexes. Ils sont mis en place au
niveau du composant. Ils permettent de manipuler les données au travers d'un `forn-mode` .

## Les formulaires reactifs 

les classe clés de ces types de formulaires sont : 
    - FormControl : représente un élement de formulaire tel qu'un `<input>`
    - FormGroup : Représente une collection de FormControl, le FormGroup de plus haut niveau: `<form>`
    - FormArray : 

    - FormArray:Représente une liste de FormControI, peut etre modifier a l'execution (ajout et suppression dynamique de FormControl
        possible)


Les statuts de fromControl qui permettent d' indiquer l' etat du formulaire:

- ng-untouched: indique que l'utilisateur n'a pas interagi avec le control
- ng-touched:

- ng-dirty: indique si fournit on a fourni une valeur au control
- ng-pristine:

- ng-valid
- ng-invalid