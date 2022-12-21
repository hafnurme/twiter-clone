export default () => {
  const login = async (credential) => {
    try {
      const { data } = await useFetch("/api/auth/login", {
        method: "post",
        body: {
          username: credential.username,
          password: credential.password,
        },
      });

      return {
        message: data.value.message,
        accessToken: data.value.access_token,
      };
    } catch (error) {
      return error;
    }
  };

  return {
    login,
  };
};
