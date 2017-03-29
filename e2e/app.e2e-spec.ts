import { GaoyuanLivePage } from './app.po';

describe('gaoyuan-live App', () => {
  let page: GaoyuanLivePage;

  beforeEach(() => {
    page = new GaoyuanLivePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
