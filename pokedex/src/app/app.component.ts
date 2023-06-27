import { Component } from '@angular/core';

@Component({
  selector: 'px-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokedex';
  numberofpokemon = 1015;
  pokemons: Array<any> = [];
  somePokemon = {name : 'Salamèche', type : 'feu'};

  displayPokemon(): void {
    this.pokemons = [
      {name : 'Salamèche'},
      {name : 'Pikachu'},
      {name : 'tortank'},
    ]
  }
}

