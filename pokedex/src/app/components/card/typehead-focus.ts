import { Component, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';



@Component({
	selector: 'ngbd-typeahead-focus',
	templateUrl: './typeahead-focus.html',
	styleUrls: ['./typehead-focus.css'],

})

export class NgbdTypeaheadFocus {
	public Names: any;
	pokemonNames: string[] = [];
	selectedPokemonName: string | undefined;
	pokemonType: string | undefined;
	pokemonStats: any;
	pokedexId : any;

	data: any[] = [];

	public Weights : any;
	public Height : any;
	pokemonWeight : string | undefined;
	pokemonHeight : string | undefined;
	

	@ViewChild('instance', { static: true })
    instance!: NgbTypeahead;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();
	selectedPokemonImage: any;
	

	constructor(private http: HttpClient) { }

	ngOnInit(): void {
		this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=4000&offset=0').subscribe(
		  data => {
			this.pokemonNames = data.results.map((pokemon: { name: any; }) => pokemon.name);

			this.data = [
				{ code: 'Name', name: this.pokemonNames },

			  ];
		  },
		  error => {
			console.error('Error: ' + error);
		  }
		);
	  }
	
	  onSelectPokemon(event: any) {
		let selectedPokemonName = event.item;
		this.http.get<any>('https://api-pokemon-fr.vercel.app/api/v1/pokemon/' + selectedPokemonName).subscribe(
		  data => {
			this.pokedexId = data.pokedexId;
			this.Weights = data.weight;
			this.pokemonHeight = data.height; 
			this.pokemonType = data.types[0].name; 
			this.pokemonStats = data.stats; 
			
			this.data.unshift({
				ID: this.pokedexId,
				Nom: selectedPokemonName,
				Poid: this.Weights,
				Taille: this.pokemonHeight,
				Type: this.pokemonType,
				HP: this.pokemonStats.hp,
				Attaque: this.pokemonStats.atk,
				Defense: this.pokemonStats.def,
				SpecialAttaque: this.pokemonStats.spe_atk,
				SpecialDefense: this.pokemonStats.spe_def,
				Vitesse: this.pokemonStats.vit
			  });
			  
			  this.selectedPokemonImage = `https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/${this.pokedexId}/regular.png`;
			  console.log(this.selectedPokemonImage);
		  },
		  error => {
			console.error('Error: ' + error);
		  }
		);
	  }
		
	  handleButtonClick() {
		console.log('Le bouton a été cliqué.' + this.selectedPokemonImage);
	  }
	  
	  resetTable() {
		this.data = [];
	  }
	  


	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
		const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
		const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
		const inputFocus$ = this.focus$;

		return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
			map(term => (term === '' ? this.pokemonNames
			  : this.pokemonNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
		  );
	};
}
