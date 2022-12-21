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
      // console.log(data);
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

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await refreshToken();
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
  };
};
