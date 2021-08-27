import axios from "axios";

const uploadImage = async (file) => {
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append("upload_preset", "curso_vue");
    formData.append("file", file);

    const urlBase = "https://api.cloudinary.com/v1_1/dy59ymdks/image/upload";
    const { data } = await axios.post(urlBase, formData);

    console.log(data);
    return data.secure_url;
  } catch (error) {
    console.error("Error al cargar la imagen: " + error);
  }
};

export default uploadImage;
