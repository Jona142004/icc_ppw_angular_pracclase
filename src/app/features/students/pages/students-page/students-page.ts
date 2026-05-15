import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-students-page',
  imports: [RouterLink],
  templateUrl: './students-page.html',
  styleUrl: './students-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class StudentsPage {
  readonly students = signal([
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María Gómez' },
    { id: 3, name: 'Carlos Rodríguez' },
    { id: 4, name: 'Ana Martínez' },
    { id: 5, name: 'Luis Fernández' }
  ]);
}
