import { Component, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';



@Component({
	selector: 'ngbd-typeahead-focus',
	standalone: true,
	imports: [NgbTypeaheadModule, FormsModule, JsonPipe],
	templateUrl: './typeahead-focus.html',
	styles: [
		`	d-flex justify-content-center
			.form-control {
				width: 30px;
			}
		`,
	],
})

export class NgbdTypeaheadFocus {
	public model: any;
	pokemonNames: string[] = [];

	@ViewChild('instance', { static: true })
    instance!: NgbTypeahead;
	focus$ = new Subject<string>();
	click$ = new Subject<string>();

	constructor(private http: HttpClient) { }

	ngOnInit(): void {
		this.http.get<any>('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0').subscribe(
		  data => {
			this.pokemonNames = data.results.map((pokemon: { name: any; }) => pokemon.name);
		  },
		  error => {
			console.error('Error: ' + error);
		  }
		);
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
