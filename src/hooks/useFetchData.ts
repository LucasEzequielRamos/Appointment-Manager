import config from "@/utils/config";
import { useEffect, useState } from "react";

const useFetchData = (tab : TabType | null) => {
  const [data, setData] = useState<DataState>({
    user: [],
    service: [],
    appointment: [],
    professional: []
  });

  useEffect(() => {
    if (tab === null) return

    const fetchData = async () => {
      try {
        const response = await fetch(`${config.NEXT_API_URL}/${tab}`);
        const receivedData = await response.json();
        setData(prevData => ({
          ...prevData,
          [tab]: receivedData[tab]
        }));
      } catch (error) {
        console.log(error)
      }
    };
    
    fetchData();
  }, [tab]);

  return {
    data,

  };
};

export default useFetchData;
