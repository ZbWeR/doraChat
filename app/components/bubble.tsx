import { useAccessStore } from "../store";
import InfoIcon from "../icons/info.svg";
import styles from "./bubble.module.scss";
import { showModal, Toast } from "./ui-lib";
import { useEffect, useMemo, useState } from "react";

interface UsageInfo {
  result: {
    data: {
      json: {
        total: number;
        used: number;
      };
    };
  };
}

const BalanceInformation = ({ apiKey }: { apiKey: string }) => {
  const [data, setData] = useState<UsageInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/nextapi?query=${apiKey}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(
          "Failed to load data. Please check the API key and your network connection.",
        );
      }
    };

    getData();
  }, [apiKey]);

  const usageData = useMemo(() => {
    if (data) {
      const { used, total } = data.result.data.json;
      // 提前计算并格式化数值
      const percentage = ((used / total) * 100).toFixed(2);
      const formattedUsed = used.toFixed(0);
      const formattedTotal = total.toFixed(0);

      return {
        percentage,
        used: formattedUsed,
        total: formattedTotal,
      };
    }
    return null;
  }, [data]);

  if (error) return <div>Error: {error}</div>;

  if (!data) return <div>请检查是否填写了 apikey</div>;

  return (
    <div>
      <h3>Usage: {usageData?.percentage}%</h3>
      <p>
        {usageData?.used} / {usageData?.total}
      </p>
    </div>
  );
};

export const BalanceBubble = () => {
  const accessStore = useAccessStore.getState();
  const apiKey = accessStore.openaiApiKey;

  const handleClick = () => {
    showModal({
      title: "已用额度",
      children: <BalanceInformation apiKey={apiKey} />,
    });
  };

  if (!apiKey) return null;

  return (
    <div className={styles["bubble-container"]}>
      <button
        className={styles["bubble-icon"]}
        data-tooltip="查看余额"
        onClick={handleClick}
      >
        <InfoIcon />
      </button>
    </div>
  );
};
