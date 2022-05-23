import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CmsService } from './cms.service';
import { InvestmentQueryItem } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'scullycrafter';
  investment: Observable<InvestmentQueryItem[]>;
  baseUrl: string;

  constructor(private cms: CmsService) {
    this.investment = this.cms.cmsNewtonPractice.pipe(
      map((cmsInvestment) => cmsInvestment.component_investment.items)
    );
    this.baseUrl = this.cms.baseUrl;
  }
}
