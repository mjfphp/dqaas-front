import { DashboardPageComponent } from './dashboard-page.component';

describe('DashboardPageComponent', () => {
  let underTest: DashboardPageComponent;

  beforeEach(() => {
    underTest = new DashboardPageComponent();
  });

  it('should create', () => {
    expect(underTest).toBeTruthy();
  });
});
