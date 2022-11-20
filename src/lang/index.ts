import { Obj } from "reselect/es/types";
import { LOCALES } from "./locales";
import { messages } from "./messages";

export { LOCALES, messages };

export const flattenMessages = (
  nestedMessages: {
    [index: string]: string | {};
  },
  prefix = ""
) => {
  if (nestedMessages === null) {
    return {};
  }
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      Object.assign(messages, { [prefixedKey]: value });
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
};
