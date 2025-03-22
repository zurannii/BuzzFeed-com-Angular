import { Component } from '@angular/core';
import { QuizComponent } from '../../component/quiz/quiz.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuizComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
