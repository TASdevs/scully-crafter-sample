import { Component, OnInit } from '@angular/core';
import {CmsService} from '../cms.service';
import {map} from 'rxjs';
import {HelpPageData, QuestionSets} from '../../types/helpPageQuestionSet';

const helpPageGraphQlQuery = `
query MyQuery {
  component_helppagedata {
    items {
      questionSets_o {
        item {
          component {
            ... on component_helpPageQuestionSet {
              internal__name
              testquestions_o {
                item {
                  component {
                    ... on component_questionAnswer {
                      answer_t
                      question_t
                    }
                  }
                }
              }
              heading_t
            }
          }
        }
      }
    }
  }
}
`;

interface MappedQuestionSet {
  heading: string,
  questions: {
    question: string,
    answer: string
  }[]
}

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.css']
})
export class HelpPageComponent implements OnInit {
  public title = 'scullycrafter';
  public mappedQuestionSets!: MappedQuestionSet[];
  private baseUrl: string;

  constructor(private cms: CmsService<HelpPageData>) {
    this.cms.getCmsData(helpPageGraphQlQuery, 'help').pipe(
      map((cmsData) => cmsData.component_helppagedata.items[0])
    ).subscribe((data) => {
      this.mappedQuestionSets = this.getMappedQuestionSet(data);
    });
    this.baseUrl = this.cms.baseUrl;
  }

  ngOnInit(): void {
  }

  private getMappedQuestionSet = (questionSets: QuestionSets): MappedQuestionSet[] => {
    return questionSets.questionSets_o.item.map(questionSet => {
      return {
        heading: questionSet.component.heading_t,
        questions: questionSet.component.testquestions_o.item.map(q => {
          return {question: q.component.question_t, answer: q.component.answer_t}
        })
      };
    })
  }
}
