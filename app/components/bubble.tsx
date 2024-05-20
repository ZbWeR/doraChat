import { useAccessStore } from "../store";
import InfoIcon from "../icons/info.svg";
import LoadingIcon from "../icons/three-dots.svg";
import styles from "./bubble.module.scss";
import { showModal } from "./ui-lib";
import { useEffect, useMemo, useState } from "react";
import { Tour } from "antd";
import { tourSteps } from "../utils/tour";

interface UsageInfo {
  total: number;
  used: number;
  useGlobalLimit: boolean;
}

const formatNumberWithCommas = (x: number) => {
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  return x.toFixed(0).replace(regex, ",");
};

const BalanceInformation = ({ apiKey }: { apiKey: string }) => {
  const [usage, setUsage] = useState<UsageInfo | null>(null);
  const [error, setError] = useState("");
  const defaultError =
    "Failed to load data. Please check the API key and your network connection.";

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/nextapi?query=${apiKey}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const jsonData = await response.json();
        if (jsonData?.result?.data?.json)
          setUsage(jsonData?.result?.data?.json);
        else setError(defaultError);
      } catch (err) {
        setError(defaultError);
      }
    };
    getData();
  }, [apiKey]);

  const displayInfo = useMemo(() => {
    if (!usage) return {};
    const { used, total } = usage;
    const percent = (((total - used) / total) * 100).toFixed(2);
    return {
      percent,
      percentStatus: Number(percent) > 10 ? "remain-plenty" : "remain-little",
      used: formatNumberWithCommas(used),
      total: formatNumberWithCommas(total),
    };
  }, [usage]);

  if (error) return <div>Error: {error}</div>;
  if (!usage)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50px",
        }}
      >
        <LoadingIcon />
      </div>
    );

  return (
    <>
      <div className={styles["statistic"]}>
        <div className={styles["statistic-item"]}>
          <p className={styles["label"]}>Used (tokens)</p>
          <p>{displayInfo.used} </p>
        </div>
        <div className={styles["statistic-item"]}>
          <p className={styles["label"]}>Total (tokens)</p>
          <p>{displayInfo.total}</p>
        </div>
        <div className={styles["statistic-item"]}>
          <p className={styles["label"]}>Remain</p>
          <p className={styles[displayInfo.percentStatus!]}>
            {displayInfo.percent} %
          </p>
        </div>
      </div>
      <p className={styles["tips"]}>
        Tips: 当你不需要上下文记忆时, 清除聊天记录后再进行对话, 可以节省 tokens
        也会让结果更准确
      </p>
    </>
  );
};

export const BalanceBubble = () => {
  const [open, setOpen] = useState<boolean>(false);

  const accessStore = useAccessStore.getState();
  const apiKey = accessStore.openaiApiKey;

  useEffect(() => {
    const isMobile = window.innerWidth < 600;
    // 用户第一次访问时打开欢迎提示 && 不在移动端显示该消息
    const isFirstVisit = localStorage.getItem("first-visit") === null;
    if (isFirstVisit && !isMobile) {
      setOpen(true);
      localStorage.setItem("first-visit", "true");
    }
  }, []);

  const handleClick = () => {
    showModal({
      title: "已用额度",
      children: <BalanceInformation apiKey={apiKey} />,
    });
  };

  if (!apiKey) return null;
  return (
    <>
      <div className={styles["bubble-container"]} id="balance-info">
        <button
          className={styles["bubble-icon"]}
          data-tooltip="查看余额"
          onClick={handleClick}
        >
          <InfoIcon />
        </button>
      </div>
      <Tour steps={tourSteps} open={open} onClose={() => setOpen(false)} />
    </>
  );
};
