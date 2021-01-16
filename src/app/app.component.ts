import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  difficultyLevel = 'easy';
  isQuizStart = false;

  selectChange(value: string) {
    this.difficultyLevel = value;
  }

  startQuiz() {
    this.isQuizStart = true;
  }
}
