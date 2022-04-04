import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeExam'
})
export class TypeExamPipe implements PipeTransform {
  type_exam: string = '';

  transform(value: number): string {
    if (value == 1) {
      this.type_exam = 'Tự luận';
    } else {
      this.type_exam = 'Trách nghiệm';
    }
    return this.type_exam;
  }
}
