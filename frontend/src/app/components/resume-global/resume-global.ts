import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType, Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'; // <-- 1. MODIFIÉ ICI
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
Chart.register(...registerables);
@Component({
  selector: 'app-resume-global',
  standalone: true,
  imports:[MatCardModule,BaseChartDirective,MatTableModule,CommonModule],
  templateUrl: './resume-global.html',
  styleUrls: ['./resume-global.css']
})
export class ResumeGlobalComponent implements OnInit {
  
  // 1. Indicateurs Clés (Cards)
  totalImagesAnalysed: number = 14520;
  modelAccuracy: number = 94.6;
  diseasesDetectedToday: number = 42;

  // 2. Configuration du Graphique Circulaire (Maladies Fréquentes)
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };
  
  // Extraction et simulation de tes classes spécifiques (ex: Tomato, Apple, Potato)
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Tomato__yellow_leaf_curl_virus', 'Potato__late_blight', 'Apple__black_rot', 'Rice__leaf_blast', 'Autres saines'],
    datasets: [
      { data: [35, 25, 15, 10, 15], backgroundColor: ['#d32f2f', '#f57c00', '#388e3c', '#1976d2', '#7b1fa2'] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // 3. Configuration du Graphique en Courbe (Historique des scans sur 7 jours)
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  };
  public lineChartData: ChartData<'line'> = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Scans effectués',
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        borderColor: '#2e7d32',
        pointBackgroundColor: '#1b5e20',
        fill: true,
      }
    ]
  };
  public lineChartType: ChartType = 'line';

  // 4. Données du Tableau (5 dernières analyses)
  displayedColumns: string[] = ['id', 'plantClass', 'date', 'status'];
  recentAnalyses = [
    { id: 'SCAN-9854', plantClass: 'Tomato__late_blight', date: '16/05/2026 12:45', status: 'Malade' },
    { id: 'SCAN-9853', plantClass: 'Apple__healthy', date: '16/05/2026 11:30', status: 'Saine' },
    { id: 'SCAN-9852', plantClass: 'Potato__early_blight', date: '16/05/2026 10:15', status: 'Malade' },
    { id: 'SCAN-9851', plantClass: 'Coffee__rust', date: '15/05/2026 18:22', status: 'Malade' },
    { id: 'SCAN-9850', plantClass: 'Wheat__healthy', date: '15/05/2026 16:05', status: 'Saine' }
  ];

  constructor() { }

  ngOnInit(): void { }
  
}