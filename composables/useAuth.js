export default () => {
  const useAuthToken = () => useState();
  const useAuthUser = () => useState();

  const setToken = (newToken) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const login = async (credential) => {
    try {
      const data = await $fetch("/api/auth/login", {
        method: "post",
        body: {
          username: credential.username,
          password: credential.password,
        },
      });

      setToken(data.access_token);
      setUser(data.user);
    } catch (error) {
      return error;
    }
  };

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/refresh");
        setToken(data.access_token);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  const getUser = async () => {
    try {
      const data = await $fetch("/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${useAuthToken().value}`,
        },
      });
      console.log(data);
      setUser(data);
    } catch (error) {
      reject(error);
    }
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await refreshToken();
        await getUser();
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    login,
    useAuthUser,
    initAuth,
    useAuthToken,
  };
};
