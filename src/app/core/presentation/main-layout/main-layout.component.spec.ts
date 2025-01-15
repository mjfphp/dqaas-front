import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  let underTest: MainLayoutComponent;

  beforeEach(() => {
    underTest = new MainLayoutComponent();
  });

  it('should create', () => {
    expect(underTest).toBeTruthy();
  });
});
