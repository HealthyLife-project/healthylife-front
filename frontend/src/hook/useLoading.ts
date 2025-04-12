import { useState } from "react";

type UseLoadingReturnType<T> = [boolean, (...args: any[]) => Promise<T>];

const useLoading = <T>(
  action: (...args: any[]) => Promise<T>
): UseLoadingReturnType<T> => {
  const [isLoading, setIsLoading] = useState(false);

  const handleData = async (...args: any[]) => {
    setIsLoading(true);
    return await action(...args).finally(() => setIsLoading(false));
  };

  return [isLoading, handleData];
};

export default useLoading;
