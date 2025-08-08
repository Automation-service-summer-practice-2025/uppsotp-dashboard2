import { Component, Input, ViewChild } from '@angular/core';
import { ChartWidget } from '../../../interfaces/widget-classes';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'chart-widget',
  imports: [BaseChartDirective],
  templateUrl: './chart-widget.html',
  styleUrls: ['./chart-widget.css'],
})
export class ChartWidgetComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;
  @Input() widget!: ChartWidget;

  chartType: any = 'bar';
  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Ангуляр', 'Самый', 'Лучший', 'Фреймворк', 'В', 'Мире'],
    datasets: [
      {
        label: 'Название столбца - тип: string',
        data: [100, 150, 30, 15, 20, 34],
        backgroundColor: [
          //Цвет столбцов
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          // Цвет рамки
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
        ],
        borderWidth: 10, // Толщина рамки
        base: 0, // Смещение оси Ox
        barPercentage: 0.2, // Толщина столбца относительно categoryPercentage
        categoryPercentage: 0.7, // Толщина столбца
        hoverBackgroundColor: 'rgba(255, 99, 133, 0)', // Цвет заднего фона столбца при наведении курсора
        hoverBorderColor: 'rgba(255, 255, 255, 1)', // Цвет границы при наведении курсора
        hoverBorderWidth: 7, // Толщина границы при наведении курсора
        indexAxis: 'x', // Базовая ось набора данных. "x" для вертикальных столбцов и "y" для горизонтальных.
        maxBarThickness: 100, //Установите это значение, чтобы убедиться, что размер брусков не превышает этого
        minBarLength: 70, //Установите это значение, чтобы полосы имели минимальную длину в пикселях.
        // order - Нужен, когда у нас несколько графиков, чтобы определить порядок отрисовки графиков
        //pointStyle: "circle" // Стиль точек графика
      },
    ],
  };

  chartOptions: ChartConfiguration<'bar'>['options'] = {
    // Общие настройки options:
    responsive: true, // Автоматически подстраивать размер под контейнер.
    maintainAspectRatio: true, //Сохранять пропорции графика при изменении размера.
    // plugins: {} Настройки плагинов (легенда, заголовок, подсказки). СМ НИЖЕ
    // animation: {} Настройки анимации (появление, обновление).
    // onClick: (e) => console.log(e). Обработчик клика на элементы графика. Пример <-
    // scales: {} Настройка осей. СМ НИЖЕ
    scales: {
      x: {
        // Настройки оси X (категории)
        title: { display: true, text: 'Ось X' }, // Подпись оси
        grid: { display: false }, // Сетка (линии фона)
        ticks: { color: 'red' }, // Настройки подписей (цвет, шрифт)
        min: 0, // Минимальное значение
        max: 200, // Максимальное значение
      },
      y: {
        // Настройки оси Y (значения)
        beginAtZero: true, // Начинать с нуля
        stacked: true, // Режим "stacked" (столбцы накапливаются)
      },
    },
    plugins: {
      legend: {
        display: true, // Показывать легенду?
        position: 'top', // 'top', 'bottom', 'left', 'right'
        labels: { color: 'blue' }, // Стиль текста
      },
      title: {
        display: true,
        text: 'Моя диаграмма', // Текст заголовка
        font: { size: 20 }, // Размер шрифта
      },
      tooltip: {
        enabled: true, // Включить подсказки?
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Цвет фона
        titleColor: '#fff', // Цвет заголовка
        bodyColor: '#fff', // Цвет текста
      },
    },
    animation: {
      duration: 1000, // Плавное появление за 1 секунду
    },
  };
}
