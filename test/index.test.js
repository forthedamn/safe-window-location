require('jest');
const location = require('../index');
const config = require('config');

describe('safe location', () => {
  const configName = 'whiteList';
  const whiteListTemp = config[configName];
  let context = {};

  afterEach(() => {
    config[configName] = whiteListTemp;
  });

  beforeEach(() => {
    context = {};
  });

  it('body should be set meituan.com', () => {
    location(context, 'http://meituan.com', null, 'whiteList');
    expect(context.body).toContain('meituan.com');
    expect(context.type).toEqual('text/html');
  });

  it('body should be set erp.meituan.com', () => {
    location(context, 'http://erp.meituan.com', null, 'whiteList');
    expect(context.body).toContain('erp.meituan.com');
    expect(context.type).toEqual('text/html');
  });

  it('body should be set /', () => {
    location(context, 'https://www.baidu.com', 'parent', 'whiteList');
    expect(context.body).toContain('location = "/"');
    expect(context.body).toContain('parent');
    expect(context.type).toEqual('text/html');
  });

  it('body should be encode', () => {
    location(context, 'javascript:alert(1)', null, 'whiteList');
    expect(context.body).toContain('location = "alert(1)"');
    expect(context.type).toEqual('text/html');
  });

  it('config length equal 0', () => {
    config[configName] = [];
    location(context, 'https://www.baidu.com', 'parent', 'whiteList');
    expect(context.body).toContain('baidu.com');
    expect(context.body).toContain('parent');
    expect(context.type).toEqual('text/html');
  });

  it('use default config name', () => {
    config[configName] = [];
    location(context, 'https://www.baidu.com', 'parent');
    expect(context.body).toContain('baidu.com');
    expect(context.body).toContain('parent');
    expect(context.type).toEqual('text/html');
  });

  it('location equal null', () => {
    config[configName] = [];
    location(context, null, 'parent', 'whiteList');
    expect(context.body).toContain('location = "/"');
    expect(context.type).toEqual('text/html');
  });

  it('context equal null', () => {
    config[configName] = [];
    location(null, 'https://www.baidu.com', 'parent', 'whiteList');
  });
});
