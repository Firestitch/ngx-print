import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

import { FsPrintOrientation } from '../types/orientation.type';
import { IPrintConfig } from '../interfaces/config.interface';


@Injectable({
  providedIn: 'root',
})
export class FsPrint {

  private _customStylesElement: HTMLStyleElement;

  constructor(
    @Inject(DOCUMENT)
    protected _document: Document,
  ) {}

  private get _window(): Window {
    const window: Window = this._document.defaultView;

    if (!window) {
      throw new Error('window is not available');
    }

    return window;
  }

  private get _portraitStyles(): string {
    return `@page { size: portrait; }`
  }

  private get _landscapeStyles(): string {
    return `@page { size: landscape; }`
  }

  public print(config?: IPrintConfig): void {
    this._applyCustomStyles(config?.orientation);
    this._printDialogCloseAndCleanup();
    this._window.print();
  }

  private _printDialogCloseAndCleanup(): void {
    fromEvent(this._window, 'afterprint')
      .pipe(
        take(1),
      )
      .subscribe(() => {
        this._customStylesElement.remove();
      });
  }

  private _applyCustomStyles(orientation: FsPrintOrientation): void {
    const headEl = this._document.head || this._document.getElementsByTagName('head')[0];
    let styles: Text;

    if (orientation === 'portrait') {
      styles = document.createTextNode(this._portraitStyles);
    } else if (orientation === 'landscape') {
      styles = document.createTextNode(this._landscapeStyles);
    } else {
      styles = document.createTextNode('');
    }

    this._customStylesElement = this._createStylesEl(styles);
    headEl.appendChild(this._customStylesElement);
  }

  private _createStylesEl(styles: Text): HTMLStyleElement {
    const styleEl: HTMLStyleElement = this._document.createElement('style');

    styleEl.media = 'print';

    styleEl.appendChild(styles);

    return styleEl;
  }
}
