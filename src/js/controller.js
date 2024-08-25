import * as model from "./model.js";
import view from "./view.js";
////////////////// SECTION 1 ////////////////
// console.log(view);
const controlStep1Data = function (data) {
  try {
    // if data valid goto page 2
    if (model.dataValidCheck(data)) view._gotoPage(2);
    // view._gotoPage(2);
  } catch (err) {
    console.error(err);
    view._renderError(err.message);
  }
};
////////////////// SECTION 2 ////////////////
const controlPlanName = function (planName) {
  model.setPlanName(planName);
};

const controlPlanType = function (planType) {
  model.setPlanType(planType);
};
const controlStep2Data = function () {
  /// goto page 3
  view._gotoPage(3);
};
////////////////// SECTION 3 ////////////////
const controlCheckAddons = function (data) {
  model.setPlanAddons(data);
};

const controlStep3Data = function () {
  /// goto page 4
  view._gotoPage(4);
};
////////////////// SECTION 5 ////////////////
const controlStep5Data = function () {
  /// goto page 5
  view._gotoPage(5);
  // push data after when confirm is clicked
  model.pushData();
  // giving data into view
  return model.state;
};

const init = function () {
  // back functionality
  view._goBack();
  // step 1
  view._addHandlerStep1(controlStep1Data);
  // step 2
  view._addHandlerSelectedPlans(controlPlanName);
  view._addHandlertoggleYearly(controlPlanType);
  view._addHandlerStep2(controlStep2Data);
  // step 3
  view._AddHandlerCheckAddons(controlCheckAddons);
  view._addHandlerStep3(controlStep3Data);
  // step 5
  view._addHandlerConfirm(controlStep5Data);
};

init();
