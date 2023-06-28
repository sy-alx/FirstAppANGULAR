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

