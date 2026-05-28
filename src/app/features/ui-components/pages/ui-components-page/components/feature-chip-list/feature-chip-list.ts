import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-feature-chip-list',
  standalone: true,
  templateUrl: './feature-chip-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureChipListComponent {
  title = input<string>('Características');
  chips = input<string[]>([]);
}
