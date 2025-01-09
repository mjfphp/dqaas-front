import { TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { AuthServiceInterface } from '../../../../../core/domain/services/auth-service.interface';
import { Store } from '@ngrx/store';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let authServiceMock: jest.Mocked<AuthServiceInterface>;
  let storeMock: jest.Mocked<Store>;

  beforeEach(() => {
    authServiceMock = {
      hasValidAccessToken: jest.fn(),
    } as unknown as jest.Mocked<AuthServiceInterface>;

    storeMock = {
      dispatch: jest.fn(),
    } as unknown as jest.Mocked<Store>;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthServiceInterface, useValue: authServiceMock },
        { provide: Store, useValue: storeMock },
      ],
    });

    const fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});