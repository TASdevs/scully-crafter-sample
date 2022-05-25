import { Component, OnInit } from '@angular/core';
import {CmsService} from '../cms.service';
import {map, Observable} from 'rxjs';
import {HelpPageQueryData, Hero} from '../types';

const helpPageGraphQlQuery = `
query MyQuery {
  component_helpPageHero {
    items {
      heading_t
      subheading_t
      heroImage_s
    }
  }
}
`;

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.css']
})
export class HelpPageComponent implements OnInit {
  title = 'scullycrafter';
  hero?: Hero;
  baseUrl: string;
  constructor(private cms: CmsService<HelpPageQueryData>) {
    this.cms.getCmsData(helpPageGraphQlQuery, 'help').pipe(
      map((cmsData) => cmsData.component_helpPageHero.items[0])
    ).subscribe((data) => {
      this.hero = data;
    });
    this.baseUrl = this.cms.baseUrl;
  }

  ngOnInit(): void {
  }

}
