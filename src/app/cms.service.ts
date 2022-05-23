import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TransferStateService} from '@scullyio/ng-lib';
import {catchError, map, Observable} from 'rxjs';
import {InvestmentQueryData} from './types';

@Injectable({
  providedIn: 'root',
})
export class CmsService {
  baseUrl: string = 'http://localhost:8080';
  cmsNewtonPractice: Observable<InvestmentQueryData>;
  constructor(private http: HttpClient, private tss: TransferStateService) {
    this.cmsNewtonPractice = this.getInvestmentGraphql();
  }

  public getInvestmentGraphql = (): Observable<InvestmentQueryData> => {
    const investmentQuery = `
      query MyQuery {
        component_investment {
          items {
            investmentImage_s
            investmentName_t
          }
        }
      }
    `;

    return this.tss.useScullyTransferState(
      'pokemon',
      this.queryGraphql<InvestmentQueryData>({query: investmentQuery})
    );
  };

  private queryGraphql<T>(options: {
    query: string;
    variables?: { [key: string]: any };
  }): Observable<T> {
    return this.http
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
