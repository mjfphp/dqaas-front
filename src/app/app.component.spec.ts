import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let underTest: AppComponent;

  beforeEach(() => {
    underTest = new AppComponent();
  });

  it('should have a title AngularJest', () => {
    expect(underTest.title).toEqual('AngularJest');
  });

});
