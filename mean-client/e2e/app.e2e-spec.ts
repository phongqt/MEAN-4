import { MeanClientPage } from './app.po';

describe('mean-client App', () => {
  let page: MeanClientPage;

  beforeEach(() => {
    page = new MeanClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
