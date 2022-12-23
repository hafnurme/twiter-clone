import formidable from "formidable";

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, field, files) => {
      if (err) {
        reject(err);
      }
      resolve({ field, files });
    });
  });

  const userId = event.context.auth.data.id;

  const { field, files } = response;

  return {
    field,
  };
});
