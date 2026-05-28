import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GlassStatCardComponent } from './components/glass-stat-card/glass-stat-card';
import { GradientCtaBannerComponent } from './components/gradient-cta-banner/gradient-cta-banner';
import { FeatureChipListComponent } from './components/feature-chip-list/feature-chip-list';

@Component({
  selector: 'app-ui-components-page',
  standalone: true,
  imports: [GlassStatCardComponent, GradientCtaBannerComponent, FeatureChipListComponent],
  templateUrl: './ui-components-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UiComponentsPage {
  readonly quickChips = [
    'Glass Surface',
    'Gradient CTA',
    'Responsive Grid',
    'Standalone Components',
    'Tailwind + DaisyUI',
  ];
}
