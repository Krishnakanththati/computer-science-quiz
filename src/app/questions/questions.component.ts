import { Component, Input, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

interface QuestionDataObject {
  question: string;
  options: string[];
  correct_answer: string;
  isSelected?: boolean;
  selectedAns?: string;
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @Input() difficultyType: string;
  isLoading: boolean;
  questionsList: QuestionDataObject[] = [];
  currentQuestion: QuestionDataObject;
  questionCount = 0;
  timerId: number;
  timerLimite = 10;
  correctAns = 0;
  quizCompleted: boolean;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.getData();
  }

  resetData() {
    this.questionsList = [];
    this.currentQuestion = null;
    this.correctAns = 0;
    this.questionCount = 0;
  }

  getData() {
    this.isLoading = true;
    this.quizCompleted = false;
    this.resetData();
    this.quizService.getQuestions(this.difficultyType).then((res: any[]) => {
      console.log(res);
      res.forEach(item => {
        this.questionsList.push({
          question: item.question,
          // options: [...item.incorrect_answers, item.correct_answer],
          options: this.setRandom([...item.incorrect_answers, item.correct_answer]),
          correct_answer: item.correct_answer
        });
      })
      console.log(this.questionsList);
      this.currentQuestion = this.questionsList[0];
      this.isLoading = false;
      this.setTimer();
    }).catch(error => {
      this.isLoading = false;
      console.log(error);
    });
  }

  nextQuestion() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    if (this.questionCount < 9) {
      this.questionCount++;
      this.currentQuestion = this.questionsList[this.questionCount];
      this.setTimer();
    } else {
      this.quizCompleted = true;
    }
  }

  setTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    this.timerLimite = 10;
    this.timerId = setInterval(() => {
      this.timerLimite--;
      if (!this.timerLimite) {
        this.nextQuestion();
      }
    }, 1000);
  }

  selectAns(item: string) {
    if (!this.currentQuestion.isSelected) {
      this.currentQuestion.isSelected = true;
      this.currentQuestion.selectedAns = item;
      if (this.currentQuestion.correct_answer === item) {
        this.correctAns++;
      }
    }
  }

  setRandom(answers: string[]) {
    return answers.sort(() => Math.random() - 0.5)
  }

}
