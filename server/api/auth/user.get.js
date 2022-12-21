import UrlPattern from "url-pattern";

export default defineEventHandler((event) => {
  const endpoint = ["api/auth/user"];
  const isHandledByThisMiddleware = endpoint.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);

    return pattern.match(event.node.req.url);
  });
  return {
    url: event.node.req.url,
    endpoint,
    isHandledByThisMiddleware,
    event: event.context.gg,
  };
});
