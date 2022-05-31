import { arabicPhrases, englishPhrases } from "./Phrases";
import { arabicConstants, englishConstants } from "./Constants";
import { arabicErrors, englishErrors } from "./Errors";

export let getLanguagePhrase = (language, phrase) => {
  if (language === "ar") {
    return arabicPhrases[phrase];
  } else if (language === "en") {
    return englishPhrases[phrase];
  }
};

export let getLanguageConstant = (language, phrase) => {
  if (language === "ar") {
    return arabicConstants[phrase];
  } else if (language === "en") {
    return englishConstants[phrase];
  }
};

export let getLanguageError = (language, error) => {
  if (language === "ar") {
    return arabicErrors[error];
  } else if (language === "en") {
    return englishErrors[error];
  }
};
