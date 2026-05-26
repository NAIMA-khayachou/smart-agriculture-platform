import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { AnalysisService } from '../../services/analysis.service';
import { WeatherService } from '../../services/weather.service';

Chart.register(...registerables);

@Component({
  selector: 'app-resume-global',
  standalone: true,
  imports: [MatCardModule, BaseChartDirective, MatTableModule, CommonModule],
  templateUrl: './resume-global.html',
  styleUrls: ['./resume-global.css']
})
export class ResumeGlobalComponent implements OnInit {

  constructor(
    private analysisService: AnalysisService,
    private weatherService: WeatherService
  ) {}

  // =========================
  // 1. METRICS
  // =========================
  diseasesDetected: number = 0;
  diseasesToday: number = 0;
  modelAccuracy: number = 96;

  // =========================
  // 2. MÉTÉO (dynamique)
  // =========================
  weatherTemp: number = 0;
  weatherDesc: string = '...';
  weatherHum: number = 0;
  weatherLoading: boolean = true;
  weatherError: boolean = false;

  // =========================
  // 3. CULTURE CHART (BAR)
  // =========================
  cultureLegend = [
    { label: 'Blé',  value: 40, color: '#1D9E75' },
    { label: 'Maïs', value: 30, color: '#f39c12' },
    { label: 'Riz',  value: 20, color: '#3498db' }
  ];

  cultureChartData: ChartData<'bar'> = {
    labels: ['Blé', 'Maïs', 'Riz'],
    datasets: [{
      data: [40, 30, 20],
      label: 'Maladies détectées',
      backgroundColor: ['#1D9E75', '#f39c12', '#3498db']
    }]
  };

  cultureChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { display: false } }
  };

  barChartType: ChartType = 'bar';

  // =========================
  // 4. TABLE
  // =========================
  displayedColumns: string[] = ['id', 'plantClass', 'date', 'status'];
  recentAnalyses: { id: number; plantClass: string; date: string; status: string }[] = [];

  // =========================
  // 5. INIT
  // =========================
  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';

    // Stats
    this.analysisService.getStats(token).subscribe((res: any) => {
      this.diseasesDetected = res.total;
      this.diseasesToday    = res.malades;
    });

    // Analyses
    this.analysisService.getAnalyses(token).subscribe((res: any) => {
      this.recentAnalyses = res.map((a: any) => ({
        id:         a.id,
        plantClass: a.class_id,
        date:       new Date(a.created_at ?? Date.now()).toLocaleString('fr-FR'),
        status:     a.status
      }));
    });

    // Météo via géolocalisation
    this.loadWeather();
  }

  private loadWeather(): void {
    if (!navigator.geolocation) {
      // Fallback : ville fixe si pas de géoloc
      this.fetchWeatherByCity('Marrakech');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.weatherService.getWeather(latitude, longitude).subscribe({
          next: (data) => this.mapWeatherData(data),
          error: () => {
            this.weatherError = true;
            this.weatherLoading = false;
          }
        });
      },
      () => {
        // Permission refusée → fallback ville fixe
        this.fetchWeatherByCity('Marrakech');
      }
    );
  }

  private fetchWeatherByCity(city: string): void {
    this.weatherService.getWeatherByCity(city).subscribe({
      next: (data) => this.mapWeatherData(data),
      error: () => {
        this.weatherError = true;
        this.weatherLoading = false;
      }
    });
  }

  private mapWeatherData(data: any): void {
    this.weatherTemp    = Math.round(data.main.temp);
    this.weatherHum     = data.main.humidity;
    this.weatherDesc    = data.weather[0].description;
    this.weatherLoading = false;
  }
}