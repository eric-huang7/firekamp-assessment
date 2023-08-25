import { Dimensions, Platform } from "react-native";

export const { width, height } = Dimensions.get("window");

export const isIOS = Platform.OS == "ios";

const guidelineBaseHeight = 926;

export const resizeUI = (size: any) => (height / guidelineBaseHeight) * size;

export const API_KEY = "eb08bbdad19f18c18714cf775650705f";
