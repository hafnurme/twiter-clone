export default () => {
  const postTweet = (formData) => {
    return useFetchApi("/api/user/tweets", {
      method: "POST",
      body: formData,
    });
  };

  return { postTweet };
};
