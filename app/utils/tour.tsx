import { TourProps } from "antd";
import DoraIcon from "../icons/dora.svg";
import { CSSProperties } from "react";

const baseStyle: CSSProperties = {
  maxWidth: "520px",
  width: "max-content",
};

export const tourSteps: TourProps["steps"] = [
  {
    title: "🎉 Welcome to Dora Chat! 🙌",
    description: "You can chat with your own AI assistant here!",
    cover: <DoraIcon style={{ width: "100px", height: "100px" }} />,
    style: baseStyle,
  },
];
