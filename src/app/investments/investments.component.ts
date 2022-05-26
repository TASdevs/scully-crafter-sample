import { Component } from '@angular/core';
import {map, Observable} from 'rxjs';
import {CmsService} from '../cms.service';
import {InvestmentPageQueryData, InvestmentQueryItem} from '../../types/investmentPage';

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

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent {
  investment: Observable<InvestmentQueryItem[]>;
  baseUrl: string;

  constructor(private cms: CmsService<InvestmentPageQueryData>) {
    this.investment = this.cms.getCmsData(investmentQuery, 'home').pipe(
      map((cmsInvestment) => cmsInvestment.component_investment.items)
    );
    this.baseUrl = this.cms.baseUrl;
  }
}
