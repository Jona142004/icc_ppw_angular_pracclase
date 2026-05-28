import { Component, signal, computed } from '@angular/core';

interface Project {
  name: string;
  description: string;
  language: string;
  color: string;
  stars: string;
  forks: string;
  icon: string;
  tag?: string;
  category: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './app-hero.html',
  styleUrl: './app-hero.css',
})
export class AppHeroComponent {
  // ---- Identidad (TUS datos reales) ----
  readonly brand = signal('DevPortfolio');
  readonly displayName = signal('Jona142004');
  readonly role = signal('Full Stack Developer');
  readonly initials = signal('JN');
  readonly tagline = signal('Construyendo el futuro con código abierto');
  readonly githubUrl = signal('https://github.com/Jona142004/ppw-angular');
  readonly contactUrl = signal('https://github.com/Jona142004');
  readonly year = signal(new Date().getFullYear());

  // ---- Navegación / tabs ----
  readonly navItems = signal([
    { label: 'Resumen', icon: '▦' },
    { label: 'Repositorios', icon: '📁' },
    { label: 'Proyectos', icon: '🧩' },
    { label: 'Insights', icon: '📊' },
  ]);
  readonly activeNav = signal('Resumen');

  readonly tabs = signal(['Proyectos', 'Dashboard', 'Experiencia', 'Sobre mí']);
  readonly activeTab = signal('Proyectos');

  // ---- Banner ----
  // OJO: valores de EJEMPLO, ajústalos a tu repo real.
  readonly totalStars = signal('4.2k');
  readonly totalForks = signal('1.1k');

  // ---- Stat cards (EJEMPLO) ----
  readonly topStats = signal([
    { label: 'Contribuciones', value: '1.2k', note: 'Último año', color: '#34d399' },
    { label: 'Repositorios', value: '45', note: 'Proyectos activos', color: '#ffffff' },
    { label: 'Stars esta semana', value: '12', note: '+15% vs anterior', color: '#a78bfa' },
  ]);

  // ---- Lenguajes (EJEMPLO, cámbialos por los reales de tu repo) ----
  readonly languages = signal([
    { name: 'TypeScript', pct: 65, color: '#3b82f6' },
    { name: 'HTML', pct: 20, color: '#f97316' },
    { name: 'CSS', pct: 15, color: '#06b6d4' },
  ]);

  // ---- Filtros + proyectos ----
  readonly filters = signal(['Todos', 'Angular', 'TypeScript', 'Web']);
  readonly activeFilter = signal('Todos');

  readonly projects = signal<Project[]>([
    {
      name: 'ppw-angular',
      description: 'Proyecto de prácticas con Angular 21, Tailwind CSS v4 y DaisyUI.',
      language: 'TypeScript',
      color: '#3b82f6',
      stars: '1.2k',
      forks: '356',
      icon: '🅰️',
      category: 'Angular',
    },
    {
      name: 'glint-ui',
      description: 'Librería de componentes con enfoque en accesibilidad.',
      language: 'TypeScript',
      color: '#3b82f6',
      stars: '850',
      forks: '89',
      icon: '✨',
      category: 'TypeScript',
    },
    {
      name: 'student-manager',
      description: 'Gestión de estudiantes con Reactive Forms y Signals.',
      language: 'TypeScript',
      color: '#3b82f6',
      stars: '512',
      forks: '120',
      icon: '🎓',
      tag: 'v1.0',
      category: 'Web',
    },
    {
      name: 'ui-components',
      description: 'Colección de componentes UI reutilizables y responsivos.',
      language: 'HTML',
      color: '#f97316',
      stars: '450',
      forks: '78',
      icon: '🧱',
      category: 'Web',
    },
  ]);

  readonly filteredProjects = computed(() => {
    const f = this.activeFilter();
    if (f === 'Todos') return this.projects();
    return this.projects().filter((p) => p.category === f);
  });
}