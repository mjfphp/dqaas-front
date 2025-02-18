import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { userActions } from './features/user/application/user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private readonly _store: Store) { }

  ngOnInit(): void {

    this._store.dispatch(userActions.request());
  }
  
}
