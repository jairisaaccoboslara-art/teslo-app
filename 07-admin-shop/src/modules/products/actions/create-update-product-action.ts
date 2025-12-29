import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interface/product.interface';

export const createUpdateProductAction = async (product: Partial<Product>) => {
  const productId = product.id;

  const newImages = await uploadImages(product.images ?? []);
  product.images = newImages;
 ;
  const body = cleanProductForCreateUpdate(product);
  if (productId && productId !== '') {
    return await updateProduct(productId, body);
  }
  return await createProduct(body);
  
};


const cleanProductForCreateUpdate = (product: Partial<Product>) => {
  delete product.id;
  delete product.user;

  return product;
};




const updateProduct = async (productId: string, product: Partial<Product>) => {
  try {
    const { data } = await tesloApi.patch<Product>(`/products/${productId}`, product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error actualizando producto');
  }
};

const createProduct = async (product: Partial<Product>) => {
  try {
    const { data } = await tesloApi.post<Product>(`/products`, product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error creaando producto');
  }
};

const uploadImages = async (images: (string | File)[]) => {
  const filesToUpload = images.filter((image) => image instanceof File) as File[];
  const currentImages = images.filter((image) => typeof image === 'string') as string[];

  const uploadPromises = filesToUpload.map(async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await tesloApi.post<{ secureUrl: string }>('/files/product', formData);
      const correctedUrl = data.secureUrl.replace('https://', 'http://');

      return correctedUrl;
    } catch (error) {
      console.log(error);
      throw new Error('Error actualizando imagenes');
    }
  });

  const uploadedImages = await Promise.all(uploadPromises);

  return [...currentImages, ...uploadedImages];
};