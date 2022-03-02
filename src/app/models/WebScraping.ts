export interface WebScraping{
  id: number,
  user_id: number,
  category_name: string,
  sub_category_name: string,
  question_title: string,
  question_description: string,
  question_date: Date,
  answer_title: JSON,
  answer_description: string,
  source: string
}
