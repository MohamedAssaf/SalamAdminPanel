import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist();

export const websiteDirectionState = atom({
  key: "websiteDirectionState", // unique ID (with respect to other atoms/selectors)
  default: window.sessionStorage.getItem("websiteDirectionState") || "rtl", // default value (aka initial value)
  effects_UNSTABLE: [persistAtom]
});

export const websiteLanguageState = atom({
  key: "websiteLanguageState", // unique ID (with respect to other atoms/selectors)
  default: window.sessionStorage.getItem("websiteLanguageState") || "ar", // default value (aka initial value)
  effects_UNSTABLE: [persistAtom]
});

export const userState = atom({
  key: "currentUser",
  default: null,
  effects_UNSTABLE: [persistAtom]
});
