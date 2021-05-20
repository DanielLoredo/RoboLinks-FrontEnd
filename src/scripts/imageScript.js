import { createLink } from "./apiScripts";
const BACK_HOST_NAME = "https://api.cloudinary.com/v1_1/dyhu4pqet/image/upload";

export const postLink = (file, update) => {
  const data = new FormData();
  let imageUrl = "";
  data.append("file", file);
  data.append("upload_preset", "idvc02qa");
  data.append("cloud_name", "dyhu4pqet");

  fetch(BACK_HOST_NAME, {
    method: "post",
    body: data,
  })
    .then((resp) => resp.json())
    .then((data) => {
      imageUrl = data.url;
      update.short_link = `http://rbgs.xyz/${update.short_link}`;
      let i;
      for (i = 0; i < update.tags.length; i++) {
        update.tags[i] = update.tags[i].toLowerCase();
      }

      createLink(
        update.URL,
        update.short_link,
        update.title,
        update.private,
        imageUrl,
        update.tags
      );
    });
};
