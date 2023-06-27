cette directive permet d'a&gir sur le style d'un élément : 
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
    