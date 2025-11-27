import { tesloApi } from '@/api/tesloApi';

export const deleteProductAction = async (productId: string) => {
  const { data } = await tesloApi.delete(`/products/${productId}`);
  return data;
};
