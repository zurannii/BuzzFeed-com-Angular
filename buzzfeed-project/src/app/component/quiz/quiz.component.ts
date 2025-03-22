import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import quizz_questions from "../../../app/assets/data/quizz_questions.json"

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

  title:string = " "

  questions: any
  questionsSelected: any
  
  answers:string[] = []
  answersSelected:string = ""

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false
  options: any;
  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
  
      this.questionIndex = 0; 
      this.questions = quizz_questions.questions;
      this.questionMaxIndex = this.questions.length;
      this.questionsSelected = this.questions[this.questionIndex]; 
  
      console.log(this.questionIndex); 
      console.log(this.questionMaxIndex); 
    } else {
      console.error("Quiz questions data not found!");
    }
  }
  playerChoose(value:string) {
    this.answers.push(value)
    this.nextStep ()
    console.log(this.answers)
    console.log("funcionou!!!")
  }
  async nextStep(){
    this.questionIndex +=1

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionsSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
      //verifica a opção ganhadora
      console.log(this.answers)
    }
  }

  async checkResult(answers:string[]){
    ['A', 'A', 'B', 'A']
    const result = answers.reduce((previous, current, i, arr) => {
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length 
        ) {
          return previous
        } else {
          return current
        }
    })
    return result
  }

}
