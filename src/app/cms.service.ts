import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export type PokemonQueryType = 'Water' | 'Fire' | 'Grass';
export type PokemonQueryItem = {
  number_i: number;
  height_s: string;
  description_t: string;
  title_s: string;
  weight_s: string;
  image_s?: string;
  type_o: { item: { value_smv: PokemonQueryType }[] };
};
export type PokemonQueryData = {
  component_pokemon: { items: PokemonQueryItem[] };
};

@Injectable({
  providedIn: 'root',
})
export class CmsService {
  baseUrl: string = 'http://localhost:8080';
  cmsPokemon: Observable<PokemonQueryData>;
  constructor(private http: HttpClient) {
    this.cmsPokemon = this.getPokemonGraphql();
  }

  public getPokemonGraphql = (): Observable<PokemonQueryData> => {
    const query = `
    query MyQuery {
      component_pokemon {
        items {
          number_i
          height_s
          description_t
          title_s
          weight_s
          image_s
          type_o {
            item {
              value_smv
            }
          }
        }
      }
    }
    `;
    return this.queryGraphql({ query: query });
  };

  public queryGraphql<T>(options: {
    query: string;
    variables?: { [key: string]: any };
  }): Observable<T> {
    return this.http
      .post<{ data: T }>(
        `${this.baseUrl}/api/1/site/graphql?crafterSite=pokemon-db`,
        {
          query: options.query,
          variables: options.variables,
        }
      )
      .pipe(map((d) => d.data));
  }
}
