export type HelpPageData = {
  component_helppagedata: {
    items: QuestionSets[]
  }
}

export type QuestionSets = {
  questionSets_o: {
    item: QuestionSet[]
  }
}

export type QuestionSet = {
  component: {
    testquestions_o: {
      item: QuestionAnswerItem[]
    },
    heading_t: string
  }
}

export type QuestionAnswerItem = {
  component: {
    answer_t: string,
    question_t: string
  }
}

