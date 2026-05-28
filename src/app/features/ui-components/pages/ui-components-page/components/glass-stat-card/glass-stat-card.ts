import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-glass-stat-card',
  standalone: true,
  templateUrl: './glass-stat-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlassStatCardComponent {
  label = input.required<string>();
  value = input.required<string>();
  helper = input<string>('Actualizado recientemente');
}
