import { atom } from "recoil";

export const websiteDirectionState = atom({
  key: "websiteDirectionState", // unique ID (with respect to other atoms/selectors)
  default: window.sessionStorage.getItem("websiteDirectionState") || "ltr", // default value (aka initial value)
});

export const websiteLanguageState = atom({
  key: "websiteLanguageState", // unique ID (with respect to other atoms/selectors)
  default: window.sessionStorage.getItem("websiteLanguageState") || "ar", // default value (aka initial value)
});

export const userState = atom({
  key: "currentUser",
  default: null,
});
