export const state = {
  fullName: "",
  emailAddress: "",
  phoneNumber: "",
  plan: {
    name: "Arcade",
    type: "monthly",
    addons: [],
  },
};
export const data = [];

export const dataValidCheck = function (data) {
  try {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // check data valid
    if (
      data.fullName === "" ||
      data.phoneNumber === "" ||
      data.emailAdress === ""
    )
      throw new Error("This field is required");
    if (!emailPattern.test(data.emailAddress))
      throw new Error("The email address is not formatted correctly");
    // update state
    state.fullName = data.fullName;
    state.emailAddress = data.emailAddress;
    state.phoneNumber = data.phoneNumber;
    return true;
  } catch (err) {
    throw err;
  }
};

export const setPlanName = function (planName) {
  state.plan.name = planName;
};
export const setPlanType = function (planType) {
  state.plan.type = `${planType}ly`;
};
export const setPlanAddons = function (addons) {
  state.plan.addons = addons;
};
export const pushData = function () {
  data.push(state);
};
