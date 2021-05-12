const BACK_HOST_NAME = "https://api.cloudinary.com/v1_1/dyhu4pqet/image/upload";

export function uploadImageCloudinary(file) {
  const url = BACK_HOST_NAME;
  const xhr = new XMLHttpRequest();
  const fd = new FormData();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  fd.append("upload_preset", "idvc02qa");
  fd.append("tags", "browser_upload");
  fd.append("file", file);
  xhr.send(fd);
}
