import { useState } from "react";
import { AxiosResponse } from "axios";
import { AxiosCall } from "@/models/AxiosCall";

export const useFetchAndLoader = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    try {
      setLoading(true);
      let result = {} as AxiosResponse<any>;
      result = await axiosCall.call;

      return result.data.response;
    } finally {
      setLoading(false);
    }
  };

  return { loading, callEndpoint };
};
