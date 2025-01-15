import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-internal-server-error-page',
  imports: [RouterLink, NzButtonModule, NzResultModule],
  templateUrl: './internal-server-error-page.component.html',
  styleUrl: './internal-server-error-page.component.scss'
})
export class InternalServerErrorPageComponent {

}
