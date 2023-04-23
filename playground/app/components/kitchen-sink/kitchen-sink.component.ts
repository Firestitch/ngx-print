import { Component } from '@angular/core';
import { KitchenSinkConfigureComponent } from '../kitchen-sink-configure';
import { FsExampleComponent } from '@firestitch/example';
import { FsMessage } from '@firestitch/message';
import { FsPrint } from '@firestitch/package';

@Component({
  selector: 'kitchen-sink',
  templateUrl: 'kitchen-sink.component.html',
  styleUrls: ['kitchen-sink.component.scss']
})
export class KitchenSinkComponent {

  public config = {};

  constructor(
    private exampleComponent: FsExampleComponent,
    private message: FsMessage,
    private _print: FsPrint,
  ) {
    exampleComponent.setConfigureComponent(KitchenSinkConfigureComponent, { config: this.config });
  }

  public printPortrait() {
    this._print.print();
  }

  public printLandscape() {
    this._print.print({ orientation: 'landscape' });
  }
}
