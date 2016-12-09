import { Angular2FormPage } from './app.po';

describe('angular2-form App', function() {
  let page: Angular2FormPage;

  beforeEach(() => {
    page = new Angular2FormPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
