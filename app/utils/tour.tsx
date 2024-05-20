"use client";

import { TourProps, TourStepProps } from "antd";
import DoraIcon from "../icons/dora.svg";
import { CSSProperties } from "react";

const baseStyle: CSSProperties = {
  maxWidth: "520px",
  width: "max-content",
};

const rawTourSteps: TourProps["steps"] = [
  {
    title: "🎉 Welcome to Dora Chat! 🙌",
    description: "You can chat with your own AI assistant here!",
    cover: <DoraIcon style={{ width: "100px", height: "100px" }} />,
  },
  {
    title: "Chat Area: 聊天区",
    description: "你可以在这里与 Dora 进行对话!",
    target: () => document.querySelector("#chat-area")!,
    placement: "left",
  },
  {
    title: "Chat Tools: 聊天工具栏",
    description: "在这里, 你可以清除聊天记录、切换语言模型或者使用快捷指令...",
    target: () => document.querySelector("#chat-tools")!,
  },
  {
    title: "Clear History: 清除聊天记录",
    description:
      "点击即可清除聊天记录, 如果你的某轮对话不需要依赖上下文, 清除历史后再对话, 结果会更加准确也会更快哦!",
    target: () => document.querySelector("#clear-history")!,
  },
  {
    title: "Change Model: 切换模型",
    description: "你可以在这里切换不同的语言模型, 以获得不同的对话体验.",
    target: () => document.querySelector("#change-model")!,
  },
  {
    title: "Sidebar: 侧边栏",
    description: "你可以切换不同的对话记录, 或者开始一轮新的对话.",
    target: () => document.querySelector("#sidebar-show")!,
    placement: "right",
  },
  {
    title: "Setting: 设置",
    description:
      "你可以在这里调整 Dora Chat 的设置.例如模型参数, 自定义接口等等.",
    target: () => document.querySelector("#setting")!,
  },
  {
    title: "Balance Information: 查询余额",
    description: "你可以在这里查询你的 API 使用情况.",
    target: () => document.querySelector("#balance-info")!,
  },
  {
    title: "🎉 Enjoy your chat! 🙌",
    description: "Have fun chatting with Dora Chat!",
    cover: <DoraIcon style={{ width: "100px", height: "100px" }} />,
  },
];

export const tourSteps = rawTourSteps.map((step) => ({
  style: baseStyle,
  ...step,
}));
