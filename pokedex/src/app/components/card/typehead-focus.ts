import { Component, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  pokedexId: any;

  data: any[] = [];

  public Weights: any;
  public Height: any;
  pokemonWeight: string | undefined;
  pokemonHeight: string | undefined;

  @ViewChild('instance', { static: true })
  instance!: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  selectedPokemonImage: string | undefined;

  @ViewChild('dt', { static: true })
  table!: Table;

  constructor(private http: HttpClient, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.http.get<any>('https://api-pokemon-fr.vercel.app/api/v1/pokemon').subscribe(
      (data) => {
        this.pokemonNames = data.map((pokemon: { name: { fr: any } }) => pokemon.name.fr);
      },
      (error) => {
        console.error('Error: ' + error);
      }
    );

    this.data = JSON.parse(localStorage.getItem('data') || '[]');
  }

  onSelectPokemon(event: any) {
    let selectedPokemonName = event.item;
    let unaccentedPokemonName = selectedPokemonName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    this.http.get<any>('https://api-pokemon-fr.vercel.app/api/v1/pokemon/' + unaccentedPokemonName).subscribe(
      (data) => {
        this.pokedexId = data.pokedexId;
        this.Weights = data.weight;
		this.Height =data.height;
        this.pokemonHeight = data.height;
        this.pokemonType = data.types[0].name;
        this.pokemonStats = data.stats;

        this.data = [
          {
            ID: this.pokedexId,
            Nom: selectedPokemonName,
            Poid: parseFloat(this.Weights.replace(' kg', '').replace(',', '.')),
            Taille: parseFloat(this.Height.replace(' m', '').replace(',', '.')) || 0,
            Type: this.pokemonType,
            HP: this.pokemonStats.hp,
            Attaque: this.pokemonStats.atk,
            Defense: this.pokemonStats.def,
            SpecialAttaque: this.pokemonStats.spe_atk,
            SpecialDefense: this.pokemonStats.spe_def,
            Vitesse: this.pokemonStats.vit,
          },
          ...this.data,
        ];

        this.selectedPokemonImage = `https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/${this.pokedexId}/regular.png`;

        localStorage.setItem('data', JSON.stringify(this.data));
      },
      (error) => {
        console.error('Error: ' + error);
      }
    );
  }

  open(content: any, pokemonId: number) {
    this.selectedPokemonImage = `https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/${pokemonId}/regular.png`;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	const pokemon = this.data.find(p => p.ID === pokemonId);
	if (pokemon) {
	  this.selectedPokemonName = pokemon.Nom;
	}
  }

  resetTable() {
    this.data = [];
    this.table.clear();
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) => (term === '' ? this.pokemonNames : this.pokemonNames.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  };
}
