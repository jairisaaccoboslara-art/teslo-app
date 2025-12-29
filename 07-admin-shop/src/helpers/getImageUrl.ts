export const getImageUrl = (image?: string) => {
  if (!image) return "/no-image.png";

  // Si es URL absoluta regresarla igual
  if (image.startsWith("http")) return image;

  // Sino, es imagen de Nest
  return `${import.meta.env.VITE_TESLO_API_URL}/files/product/${image}`;
};
