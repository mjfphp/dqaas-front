import { InternalServerErrorPageComponent } from './internal-server-error-page.component';

describe('InternalServerErrorPageComponent', () => {
  let underTest: InternalServerErrorPageComponent;

  beforeEach(() => {
    underTest = new InternalServerErrorPageComponent();
  });

  it('should create', () => {
    expect(underTest).toBeTruthy();
  });
});
