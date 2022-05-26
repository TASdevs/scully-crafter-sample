import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TransferStateService} from '@scullyio/ng-lib';
import {catchError, map, Observable, of, switchMap} from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CmsService<T> {
  baseUrl: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient, private tss: TransferStateService) { }

  public getCmsData = (graphQlQuery: string, name: string): Observable<T> => {
    return this.tss.useScullyTransferState(
      name,
      (environment.environment === 'test') ?
        this.httpClient.get<T>('http://localhost:1668/data.json').pipe(switchMap((data: any) => {
          return of(data[name])
        }))
        :
        this.queryGraphql<T>({query: graphQlQuery})
    );
  };

  private queryGraphql<T>(options: {
    query: string;
    variables?: { [key: string]: any };
  }): Observable<T> {
    return this.httpClient
      .post<{ data: T }>(
        `${this.baseUrl}/api/1/site/graphql?crafterSite=newton-practice`,
        {
          query: options.query,
          variables: options.variables,
        }
      )
      .pipe(
        catchError((err) => {
          console.log(err);
          throw new Error('failed to fetch from CMS');
        })
      )
      .pipe(map((d) => d.data));
  }
}
