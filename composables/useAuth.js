import jwtDecode from "jwt-decode";

export default () => {
  const useAuthToken = () => useState("auth_token");
  const useAuthUser = () => useState("auth_user");
  const useAuthLoading = () => useState("auth_loading", () => true);

  const setToken = (newToken) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const setLoading = (value) => {
    const authLoading = useAuthLoading();
    authLoading.value = value;
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
      setUser(data);
    } catch (error) {
      reject(error);
    }
  };

  const reRefreshToken = () => {
    const authToken = useAuthToken();

    if (!authToken.value) {
      return;
    }

    const jwt = jwtDecode(authToken.value);

    const newRereshTime = jwt.exp - 60000;

    setTimeout(async () => {
      await refreshToken();
      reRefreshToken();
    }, newRereshTime);
  };

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      try {
        await refreshToken();
        await getUser();

        reRefreshToken();

        resolve(true);
      } catch (error) {
        reject(error);
      } finally {
        setLoading(false);
      }
    });
  };

  return {
    login,
    useAuthUser,
    initAuth,
    useAuthToken,
    useAuthLoading,
  };
};
