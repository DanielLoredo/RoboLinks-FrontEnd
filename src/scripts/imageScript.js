import { createLink, updateLink } from "./apiScripts";

const BACK_HOST_NAME = "https://api.cloudinary.com/v1_1/dyhu4pqet/image/upload";

export const postLink = async (file, update, linkUpdate) => {
  if (linkUpdate === true && file === null) {
    update.short_url = `http://rbgs.xyz/${update.short_link}`;

    return updateLink(update.id, update);
  } else {
    let imageUrl = "";

    if (file === null) {
      console.log(update.tags);
      imageUrl = getDefaultImage(update.tags[0]);
      update.short_link = `http://rbgs.xyz/${update.short_link}`;

      return createLink(
        update.URL,
        update.short_link,
        update.title,
        update.private,
        imageUrl,
        update.tags
      );
    } else {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "idvc02qa");
      data.append("cloud_name", "dyhu4pqet");

      //MISSING RETURN
      return fetch(BACK_HOST_NAME, {
        method: "post",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          imageUrl = data.url;

          if (linkUpdate === true) {
            if (update.short_url.startsWith("http://rbgs.xyz/")) {
              update.short_url = update.short_link;
            } else {
              update.short_url = `http://rbgs.xyz/${update.short_link}`;
            }
            return updateLink(update.id, { ...update, image: imageUrl });
          } else {
            update.short_url = `http://rbgs.xyz/${update.short_link}`;
            return createLink(
              update.URL,
              update.short_url,
              update.title,
              update.private,
              imageUrl,
              update.tags
            );
          }
        });
    }
  }
};

export function getDefaultImage(tag) {
  switch (tag) {
    case "@home":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620864746/home_t1xghn.jpg";
    case "candidates":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620864776/candidates_1_ed9jm2.jpg";
    case "contests":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620864830/contests_1_c5gbjm.jpg";
    case "covid":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620864857/covid_rauq8x.jpg";
    case "docs":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620864883/docs_1_jcrqms.jpg";
    case "drones":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620864901/drones_uj51c0.png";
    case "electronics":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620864920/electronics_xnm1dn.jpg";
    case "github":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620864933/github_j333wt.jpg";
    case "larcOpen":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620864949/larc-open_1_cwpbbv.jpg";
    case "mechanics":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620864964/mechanics_zevzxu.jpg";
    case "presentation":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620865327/Google-Slides_umnkar.jpg";
    case "programming":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620865347/programming_1_ce8crx.jpg";
    case "robocup":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620865376/robocup_dd2igq.jpg";
    case "sideProjects":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620865397/side-projects_h89ajf.png";
    case "social":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620865546/social-media_md_tfaqtv.jpg";
    case "sponsors":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620865576/sponsors_dqhvsn.png";
    case "vsss":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620865591/vsss_qzyzbo.jpg";
    case "youtube":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620865612/youtube_1_chlehs.png";
    case "workshop":
      return "https://res.cloudinary.com/dyhu4pqet/image/upload/v1620864815/Clases_Talleres.jpg_1_n0vtb2.png";
    default:
      return "Unknown tag";
  }
}
