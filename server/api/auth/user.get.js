export default defineEventHandler((event) => {
  const user = event.context.auth?.data;
  return {
    user: event.context.auth?.data,
  };
});
