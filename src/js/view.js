class View {
  ////////////////// SECTION 1 ////////////////
  constructor() {
    this._change();
  }
  _getData() {
    const data = {
      fullName: document.getElementById("name").value,
      emailAddress: document.getElementById("email").value,
      phoneNumber: document.getElementById("num").value,
    };
    return data;
  }

  _renderError(msg) {
    const errorName = document.querySelector(".error-name");
    const fullName = document.getElementById("name");
    const emailAddress = document.getElementById("email");
    const errorEmail = document.querySelector(".error-email");
    const phoneNumber = document.getElementById("num");
    const errorPhone = document.querySelector(".error-phone");
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (fullName.value === "") {
      errorName.textContent = msg;
      fullName.classList.add("error");
    } else {
      errorName.textContent = "";
      fullName.classList.remove("error");
    }
    if (emailAddress.value === "") {
      errorEmail.textContent = "This field is required";
      emailAddress.classList.add("error");
    } else if (!emailPattern.test(emailAddress.value)) {
      errorEmail.textContent = "The email address is not formatted correctly";
      emailAddress.classList.add("error");
    } else {
      errorEmail.textContent = "";
      emailAddress.classList.remove("error");
    }
    if (phoneNumber.value === "") {
      errorPhone.textContent = msg;
      phoneNumber.classList.add("error");
    } else {
      errorPhone.textContent = "";
      phoneNumber.classList.remove("error");
    }
  }
  // _gotoPage() {
  //   let page = 3;
  //   document.querySelector(".btn__next").addEventListener("click", (e) => {
  //     const steps = document.querySelectorAll(".steps-container");
  //     steps.forEach((step) => step.classList.add("hidden"));
  //     const nextStepContainer = document.querySelector(`.step__${page}`);
  //     nextStepContainer.classList.remove("hidden");
  //     page = page + 1;
  //   });
  // }
  // _gotoPage(page) {
  //   const steps = document.querySelectorAll(".steps-container");
  //   steps.forEach((step) => step.classList.add("hidden"));
  //   const nextStepContainer = document.querySelector(`.step__${page}`);
  //   nextStepContainer.classList.remove("hidden");
  //   // move active class
  //   document
  //     .querySelectorAll(".bar-container")
  //     .forEach((bar) => bar.classList.remove("active"));
  //   // if (page === document.querySelectorAll(".bar-container").length)
  //   document.querySelector(`.bar__${page}`).classList.add("active");
  // }
  _gotoPage(stepNum) {
    const steps = document.querySelectorAll(".steps-container");
    steps.forEach((step) => step.classList.add("hidden"));
    const nextStepContainer = document.querySelector(`.step__${stepNum}`);
    nextStepContainer.classList.remove("hidden");
    // move active class
    document
      .querySelectorAll(".bar-container")
      .forEach((bar) => bar.classList.remove("active"));
    if (stepNum > document.querySelectorAll(".bar-container").length) return;
    document.querySelector(`.bar__${stepNum}`).classList.add("active");
  }

  _gotoPreviousStep(stepNum) {
    const step = document.querySelector(`.step__${stepNum}`);
    const previousBtn = step.querySelector(".btn__back");
    previousBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const steps = document.querySelectorAll(".steps-container");
      steps.forEach((step) => step.classList.add("hidden"));
      const previousStep = stepNum - 1;
      // prettier-ignore
      const previousStepContainer = document.querySelector(`.step__${previousStep}`);
      previousStepContainer.classList.remove("hidden");
      //  update render error
      this._renderError();
      // move active class
      document
        .querySelectorAll(".bar-container")
        .forEach((bar) => bar.classList.remove("active"));
      document.querySelector(`.bar__${previousStep}`).classList.add("active");
    });
  }

  _goBack() {
    this._gotoPreviousStep(2);
    this._gotoPreviousStep(3);
    this._gotoPreviousStep(4);
  }
  // _gotoPage2() {
  //   const steps = document.querySelectorAll(".steps-container");
  //   steps.forEach((step) => step.classList.add("hidden"));
  //   const nextStepContainer = document.querySelector(`.step__${2}`);
  //   nextStepContainer.classList.remove("hidden");
  // }

  _addHandlerStep1(handler) {
    // prettier-ignore
    document.querySelector('.step__1').querySelector('.btn__next').addEventListener('click', (e) => {
         e.preventDefault()
         const data = this._getData();
    handler(data);
    
    })
  }

  ////////////////// SECTION 2 ////////////////

  /// plan period change
  _addHandlertoggleYearly(handler) {
    let type = "month";
    const selectedPeriod = document.querySelectorAll(".period__name");
    const toggleBtn = document.querySelector(".toggle__circle");
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const plansContainer = document.querySelector(
        ".plans--period__container"
      );
      plansContainer.classList.toggle("yearly");
      document.querySelectorAll(".plan-cost").forEach((el) => {
        const text = el.textContent;
        if (plansContainer.classList.contains("yearly")) {
          /// change the price for yearly plans
          const yearlyPrice =
            text.slice(0, -3) + "0" + text.slice(-3).replace("mo", "yr");
          el.textContent = yearlyPrice;
          /// add promition
          document
            .querySelectorAll(".plans__container")
            .forEach((plan) => plan.classList.add("yearly"));
          ///
          type = "year";
        } else {
          /// change the price for monthly plans
          const monthlyPrice =
            text.slice(0, -4) + text.slice(-3).replace("yr", "mo");
          el.textContent = monthlyPrice;
          /// add 2months free
          document
            .querySelectorAll(".plans__container")
            .forEach((plan) => plan.classList.remove("yearly"));
          ///
          type = "month";
        }
        selectedPeriod.forEach((el) => (el.textContent = `${type}`));
        handler(type);
      });
    });
  }

  //// select plan
  _addHandlerSelectedPlans(handler) {
    const plansContainer = document.querySelector(".plans__container");
    const planContainer = document.querySelectorAll(".plan-container");
    const selectedPlan = document.querySelector(".selected__plan--name");
    const planCost = document.querySelector(".selected__plan--cost");

    plansContainer.addEventListener("click", function (e) {
      // remove active class from all plans
      planContainer.forEach((plan) => plan.classList.remove("active"));
      // add active class to selected one
      const plan = e.target.closest(".plan-container");
      if (!plan) return;
      plan.classList.add("active");
      // get plan name
      const data = plan.dataset.plan;
      selectedPlan.firstChild.textContent = `${data} `;
      // get plan cost
      const cost = e.target
        .closest(".plan-container")
        .querySelector(".plan-cost").textContent;
      planCost.textContent = cost;
      handler(data);
    });
  }

  //// goto next step
  _addHandlerStep2(handler) {
    // prettier-ignore
    const btnNext = document.querySelector('.step__2').querySelector(".btn__next");
    btnNext.addEventListener("click", (e) => {
      e.preventDefault();
      handler();
    });
  }

  ////////////////// SECTION 3 ////////////////
  //// goto next step
  _addHandlerStep3(handler) {
    // prettier-ignore
    const btnNext = document.querySelector(".step__3").querySelector(".btn__next");
    btnNext.addEventListener("click", (e) => {
      e.preventDefault();
      this._gotoPage(4);
      this._totalPrice();
      handler();
    });
  }

  _AddHandlerCheckAddons(handler) {
    const checkedAddon = [];
    document.querySelectorAll(".add_ons").forEach((add) => {
      add.addEventListener("click", function (e) {
        const checkbox = e.target
          .closest(".add_ons")
          .querySelector(".checkbox");
        if (!checkbox) return;
        checkbox.checked = !checkbox.checked;
        /// active class
        checkbox.checked
          ? add.classList.add("active")
          : add.classList.remove("active");
        ////////////////// SECTION 4 ////////////////
        /// adding online service
        if (this.classList.contains("online-service")) {
          //prettier-ignore
          const addonName = e.target.closest(".add_ons")
          .querySelector(".add-ons__title").textContent;
          const price = this.querySelector(".plan-cost").textContent;
          if (checkbox.checked) {
            //// render markup
            const markup = `
          <div class="add-ons__summary online-service__add-ons">
                <p class="selected__add-ons--name">Online service</p>
                <p class="plan-cost selected__add-ons--cost">${price}</p>
              </div> `;
            document
              .querySelector(".selected__add-ons")
              .insertAdjacentHTML("beforeend", markup);
            //// push data to Array
            checkedAddon.push(addonName);
          }
          if (!checkbox.checked) {
            const onlineService = document.querySelector(
              ".online-service__add-ons"
            );
            onlineService.parentNode.removeChild(onlineService);
            ///// delete data from Array
            const index = checkedAddon.findIndex(
              (addon) => addon === addonName
            );
            checkedAddon.splice(index, 1);
          }
        }
        /// adding larger storage
        if (this.classList.contains("larger-storage")) {
          //prettier-ignore
          const addonName = e.target.closest(".add_ons")
           .querySelector(".add-ons__title").textContent;
          const price = this.querySelector(".plan-cost").textContent;
          if (checkbox.checked) {
            const markup = `
           <div class="add-ons__summary larger-storage__add-ons">
                <p class="selected__add-ons--name">Larger storage</p>
                <p class="plan-cost selected__add-ons--cost">${price}</p>
              </div> `;
            document
              .querySelector(".selected__add-ons")
              .insertAdjacentHTML("beforeend", markup);
            //// push data to Array
            checkedAddon.push(addonName);
          }
          if (!checkbox.checked) {
            const largerStorage = document.querySelector(
              ".larger-storage__add-ons"
            );
            largerStorage.parentNode.removeChild(largerStorage);
            ///// delete data from Array
            const index = checkedAddon.findIndex(
              (addon) => addon === addonName
            );
            checkedAddon.splice(index, 1);
          }
        }
        /// adding customizable profile
        if (this.classList.contains("customizable-profile")) {
          //prettier-ignore
          const addonName = e.target.closest(".add_ons")
          .querySelector(".add-ons__title").textContent;
          const price = this.querySelector(".plan-cost").textContent;
          if (checkbox.checked) {
            const markup = `
         <div class="add-ons__summary customize-profile__add-ons">
                <p class="selected__add-ons--name">Customizable Profile</p>
                <p class="plan-cost selected__add-ons--cost">${price}</p>
              </div> `;
            document
              .querySelector(".selected__add-ons")
              .insertAdjacentHTML("beforeend", markup);
            //// push data to Array
            checkedAddon.push(addonName);
          }
          if (!checkbox.checked) {
            const customizableProfile = document.querySelector(
              ".customize-profile__add-ons"
            );
            customizableProfile.parentNode.removeChild(customizableProfile);
            ///// delete data from Array
            const index = checkedAddon.findIndex(
              (addon) => addon === addonName
            );
            checkedAddon.splice(index, 1);
          }
        }
        handler(checkedAddon);
      });
    });
  }
  ////////////////// SECTION 5 ////////////////

  /// change functionality
  _change() {
    document.querySelector(".change").addEventListener("click", (e) => {
      this._gotoPage(2);
    });
  }
  /// total price
  _totalPrice() {
    let cost = 0;
    document
      .querySelector(".billing__container")
      .querySelectorAll(".plan-cost")
      .forEach((totalCost) => {
        cost += Number(totalCost.textContent.match(/(\d+)/)[0]);
      });
    document.querySelector(".total-num").textContent = cost;
    if (document.querySelector(".period__name").textContent === "year") {
      document.querySelector(".total-period").textContent = "/yr";
    } else {
      document.querySelector(".total-period").textContent = "/mo";
    }
  }
  ////////////////// SECTION 6 ////////////////
  _addHandlerConfirm(handler) {
    document.querySelector(".btn__confirm").addEventListener("click", (e) => {
      const data = handler();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const today = new Date().getDate();
      const thisMonth = new Date().getMonth();
      const thisYear = new Date().getFullYear();
      const nextMonth = thisMonth + 1;
      let date;
      data.plan.type === "monthly"
        ? (date = `${months[nextMonth]} ${today}, ${thisYear}`)
        : (date = `${months[thisMonth]} ${today}, ${thisYear + 1}`);

      document
        .querySelector(".thank-you__container")
        .querySelector(".heading-text").innerHTML = `
            Thank you, <span class="highlight">${data.fullName
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}</span> for confirming your subscription! 
            Your <span class="highlight">${data.plan.name}</span> plan ${
        data.plan.addons.length > 0 ? "with" : ""
      } <span class="highlight">${data.plan.addons
        .join(", ")
        .replace(
          /, ([^,]*)$/,
          " and $1"
        )}</span> will end on <span class="highlight">${date}</span>.
            We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
        `;
    });
  }
}

export default new View();
