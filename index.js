const config = require('config');
const urlUtil = require('url');
const xssFilter = require('xss-filters');
require('typeis');

function isValidate(url, whiteList) {
  url = urlUtil.parse(url);

  const hostname = url.hostname;

  // 如果只是 path
  if (!hostname) {
    return url.path;
  }

  if (whiteList && whiteList.length === 0) {
    return true;
  }

  return whiteList && whiteList.some && whiteList.some((whiteUrl) => {
    if (!whiteUrl) {
      console.log('[safa-window-location] url white list should not contain empty url!');
      return false;
    }

    // 如果是字符串，url需要相等
    if (whiteUrl.typeis('String')) {
      return hostname === whiteUrl;
    }

    // 如果是正则
    if (whiteUrl.typeis('RegExp')) {
      return hostname.match(whiteUrl) && hostname.match(whiteUrl).length > 0;
    }

    console.log('[safa-window-location] config white url is illegal! only string, regexp allowed');

    return false;
  });
}

/**
 * @param {obj} context 请求上下文
 * @param {string} location 需要跳转的地址
 * @param {string} target 目标 window
 * @param {string} configName 配置属性名
 */
function safeWindowLocation(context, location, target, configName) {
  if (!context) {
    console.warn('[safa-window-location] context should not be empty');
    return;
  }

  const TYPE = 'text/html';
  target = target || 'parent';
  const BODY = winLoc => `<script>window.${target}.location = ${JSON.stringify(winLoc)}</script>`;
  const DEFAULT_CONFIG_NAME = 'whiteList';
  let whiteList = [];

  configName = configName || DEFAULT_CONFIG_NAME;

  if (Array.isArray(config[configName])) {
    whiteList = config[configName];
  }

  if (!location) {
    console.warn('[safa-window-location] location should not be empty');
    context.type = TYPE;
    context.body = BODY('/');
    return;
  }

  const validate = isValidate(location, whiteList);
  if (typeof validate === 'string') {
    location = xssFilter.uriInUnQuotedAttr(validate);
  } else {
    location = !validate ? '/' : location;
  }

  context.type = TYPE;
  context.body = BODY(location);
}

module.exports = safeWindowLocation;
