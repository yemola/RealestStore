import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "http://192.168.43.60:9001/api",
  },
  preview: {
    apiUrl: "https://done-uh3o.onrender.com/api",
  },
  prod: {
    apiUrl: "https://done-uh3o.onrender.com/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.expoConfig.releaseChannel === "preview")
    return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
