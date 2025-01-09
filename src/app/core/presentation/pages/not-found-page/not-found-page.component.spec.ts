import { NotFoundPageComponent } from './not-found-page.component';

describe('NotFoundPageComponent', () => {
  let underTest: NotFoundPageComponent;

  beforeEach(() => {
    underTest = new NotFoundPageComponent();
  });

  it('should create', () => {
    expect(underTest).toBeTruthy();
  });
});
