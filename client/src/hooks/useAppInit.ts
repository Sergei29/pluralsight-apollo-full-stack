import { useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { USER_INFO } from "../graphql/mutations";
import { AuthContext } from "../graphql/AuthProvider";

type HookReturnType = { loading: boolean };

const useAppInit = (): HookReturnType => {
  const [getUserInfo, { loading }] = useMutation(USER_INFO);
  const { setAuthInfo } = useContext(AuthContext);

  useEffect(() => {
    const handleSession = async () => {
      try {
        const {
          data: { userInfo },
        } = await getUserInfo();
        setAuthInfo({ userData: userInfo.user });
      } catch (error) {}
    };
    handleSession();
  }, [setAuthInfo, getUserInfo]);

  return { loading };
};

export default useAppInit;
