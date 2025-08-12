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
import { Text, LucideAngularModule } from 'lucide-angular';
import { EditSidebarService } from '../../../services/edit-sidebar.service';
import { Widget } from '../../../interfaces/widget.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'text-widget',
  imports: [NgxEditorComponent, FormsModule, CommonModule, LucideAngularModule],
  templateUrl: './text-widget.html',
  styleUrl: './text-widget.css',
})
export class TextWidgetComponent implements OnInit, OnDestroy {
  @Input() widget!: TextWidget;

  textIcon = Text;
  focusedWidgetSub?: Subscription;
  focusedWidget: Widget | undefined = undefined;

  constructor(
    private editSidebarService: EditSidebarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.focusedWidgetSub = this.editSidebarService.currentWidget$.subscribe(
      (widget) => {
        this.focusedWidget = widget ?? undefined;
        this.cdr.detectChanges();
        console.log(this.widget.htmlContent);
      }
    );
  }

  isEmptyContent(html: string | undefined): boolean {
    if (!html) return true;
    const textContent = html.replace(/<[^>]*>/g, '').trim();
    return textContent === '';
  }

  ngOnDestroy(): void {
    this.focusedWidgetSub?.unsubscribe();
  }
}
