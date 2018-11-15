import { browser, $ } from 'protractor';

describe('Angular Buch', () => {

  beforeEach(() => {
    browser.waitForAngularEnabled(false);
  });

  it('should be called Angular, nothing more', () => {
    browser.get('https://www.dpunkt.de/buecher/12400/9783864903571-angular.html');
    const heading = $('h1');
    expect(heading.getText()).toEqual('Angular');
  });

  afterEach(() => {
    browser.waitForAngularEnabled(true);
  });

});
