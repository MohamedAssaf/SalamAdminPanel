import * as _ from "lodash";
import { getCode } from "./Firebase";

export let validateName = (name) => {
  if (name && name.length > 0) {
    return {
      status: 1,
    };
  }
  return {
    status: 0,
    error: "emptyName",
  };
};

export let validateEmail = (email) => {
  if (email && email.length > 0) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      return {
        status: 1,
      };
    }
    return {
      status: 0,
      error: "invalidEmail",
    };
  }
  return {
    status: 0,
    error: "emptyEmail",
  };
};

export let validatePhoneNumber = (number) => {
  if (number && number.length > 0) {
    if (number.length != 10) {
      let re = new RegExp("^[0-9]+$");
      if (re.test(String(number))) {
        return {
          status: 1,
        };
      }
      return {
        status: 0,
        error: "phoneNumberHasCharacters",
      };
    }
    return {
      status: 0,
      error: "invalidPhoneNumber",
    };
  }
  return {
    status: 0,
    error: "emptyPhoneNumber",
  };
};

export let validatePassword = (password) => {
  if (password && password.length > 0) {
    if (password.length >= 8) {
      let re = new RegExp(
        '^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*d)(?=.*[!#$%&? "]).*$'
      );
      if (re.test(String(password))) {
        return {
          status: 1,
        };
      }
      return {
        status: 0,
        error: "invalidPassword",
      };
    }
    return {
      status: 0,
      error: "passwordShort",
    };
  }
  return {
    status: 0,
    error: "emptyPassword",
  };
};

export let validateInvitationCode = async (code) => {
  if (code && code.length > 0) {
    let result = await getCode(code);
    if (result) {
      console.log(result.used)
      if (result.used) {
        return {
          status: 0,
          error: "codeUsed",
        };
      } else {
        return {
          status: 1,
          data: result.id
        };
      }
    } else {
      return {
        status: 0,
        error: "invalidCode",
      };
    }
  }
  return {
    status: 0,
    error: "emptyCode",
  };
};

export let validateFile = (file) => {
  if (!_.isEmpty(file.name)) {
    return {
      status: 1,
    };
  }
  return {
    status: 0,
    error: "emptyFile",
  };
};

export let validateGender = (gender) => {
  if (gender != "") {
    return {
      status: 1,
    };
  }
  return {
    status: 0,
    error: "emptyGender",
  };
};

export let validateLogInPassword = (password) => {
  if (password && password.length > 0) {
    return {
      status: 1,
    };
  }
  return {
    status: 0,
    error: "emptyPassword",
  };
};