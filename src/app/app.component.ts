import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CmsService } from './cms.service';
import { PokemonQueryItem } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'scullycrafter';
  pokemon: Observable<PokemonQueryItem[]>;
  baseUrl: string;

  constructor(private cms: CmsService) {
    this.pokemon = this.cms.cmsPokemon.pipe(
      map((cmsPokemon) => cmsPokemon.component_pokemon.items)
    );
    this.baseUrl = this.cms.baseUrl;
  }
}
