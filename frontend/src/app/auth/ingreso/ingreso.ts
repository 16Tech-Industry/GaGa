import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ingreso.html',
  styleUrl: './ingreso.css',
})

export class Ingreso {
  form!:FormGroup;
  constructor(private formBuilder: FormBuilder)
  {
    this.form=this.formBuilder.group(
    {
      email:['',[]],
      password:['',[]],
    }
    )
  }
}
