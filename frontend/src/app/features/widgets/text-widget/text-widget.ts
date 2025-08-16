import {
  Component,
  Input,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { TextWidget } from '../../../interfaces/widget-classes';
import { NgxEditorComponent } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Type, LucideAngularModule } from 'lucide-angular';
import { Widget } from '../../../interfaces/widget.interface';
import { Subscription } from 'rxjs';
import { CurrentWidgetService } from '../../../services/current-widget.service';

@Component({
  selector: 'text-widget',
  imports: [NgxEditorComponent, FormsModule, CommonModule, LucideAngularModule],
  templateUrl: './text-widget.html',
  styleUrl: './text-widget.css',
})
export class TextWidgetComponent implements OnInit, OnDestroy {
  @Input() widget!: TextWidget;

  textIcon = Type;
  dashboardCurrentWidgetSub?: Subscription;
  dsahboardCurrentWidget: Widget | undefined = undefined;

  constructor(
    private currentWidgetService: CurrentWidgetService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dashboardCurrentWidgetSub =
      this.currentWidgetService.currentWidget$.subscribe((widget) => {
        this.dsahboardCurrentWidget = widget ?? undefined;
        this.cdr.detectChanges();
      });
  }

  isEmptyContent(html: string | undefined): boolean {
    if (!html) return true;
    const textContent = html.replace(/<[^>]*>/g, '').trim();
    return textContent === '';
  }

  ngOnDestroy(): void {
    this.dashboardCurrentWidgetSub?.unsubscribe();
  }
}
