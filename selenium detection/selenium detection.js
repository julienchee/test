// https://stackoverflow.com/questions/33225947/can-a-website-detect-when-you-are-using-selenium-with-chromedriver
// https://datadome.co/bot-management-protection/tracking-modified-selenium-chromedriver/

runBotDetection = function () {
  var documentDetectionKeys = [
    "__webdriver_evaluate",
    "__selenium_evaluate",
    "__webdriver_script_function",
    "__webdriver_script_func",
    "__webdriver_script_fn",
    "__fxdriver_evaluate",
    "__driver_unwrapped",
    "__webdriver_unwrapped",
    "__driver_evaluate",
    "__selenium_unwrapped",
    "__fxdriver_unwrapped",
  ];

  var windowDetectionKeys = [
    "_phantom",
    "__nightmare",
    "_selenium",
    "callPhantom",
    "callSelenium",
    "_Selenium_IDE_Recorder",
  ];

  for (const windowDetectionKey in windowDetectionKeys) {
    const windowDetectionKeyValue = windowDetectionKeys[windowDetectionKey];
    if (window[windowDetectionKeyValue]) {
      return true;
    }
  };
  for (const documentDetectionKey in documentDetectionKeys) {
    const documentDetectionKeyValue = documentDetectionKeys[documentDetectionKey];
    if (window['document'][documentDetectionKeyValue]) {
      return true;
    }
  };

  for (const documentKey in window['document']) {
    if (documentKey.match(/\$[a-z]dc_/) && window['document'][documentKey]['cache_']) {
      return true;
    }
  }

  if (window['external'] && window['external'].toString() && (window['external'].toString()['indexOf']('Sequentum') != -1)) return true;

  if (window['document']['documentElement']['getAttribute']('selenium')) return true;
  if (window['document']['documentElement']['getAttribute']('webdriver')) return true;
  if (window['document']['documentElement']['getAttribute']('driver')) return true;

  return false;
};

console.log(runBotDetection());

const detectDiscriminating = (opt_doc) => {
  keyword = 'cdc_';
  foundKeys = [];

  Object.keys(opt_doc).forEach((value) => {
    if (value.includes(keyword)) {
      foundKeys.push(value);
    }
  });

  return foundKeys;
};

console.log(detectDiscriminating(window));
console.log(detectDiscriminating(document));

const clearDiscriminating = () => {
  foundKeys = detectDiscriminating(window);

  foundKeys.forEach((value) => {
    delete window[value];
  });

  foundKeys = detectDiscriminating(document);

  foundKeys.forEach((value) => {
    delete document[value];
  });
};

clearDiscriminating();
console.log('clearDiscriminating');
console.log(detectDiscriminating(window));
console.log(detectDiscriminating(document));
