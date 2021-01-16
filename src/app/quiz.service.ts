import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private QUIZ_URL = 'https://opentdb.com/api.php?category=18';

  constructor(private http: HttpClient) { }

  getQuestions(difficulty: string, questionsCount = 10) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.QUIZ_URL}&amount=${questionsCount}&difficulty=${difficulty}`).subscribe((res: any) => {
        resolve(res.results);
      }, err => {
        reject(err);
      })
    });
  }

}
