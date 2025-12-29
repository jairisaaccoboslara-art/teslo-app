<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">Producto: <small class="text-blue-500">{{ title }}</small></h1>
    <hr class="my-4" />
  </div>

  <form 
  @submit="onSubmit"
  class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <div class="first-col">
      <!-- Primera parte del formulario -->
      <div class="mb-4">
        <label for="title" class="form-label">Título</label>
        <CustomInput
        v-model="title"
        v-bind="titleAttrs"
        :error="errors.title" />
      </div>

      <div class="mb-4 ">
        <label for="slug" class="form-label">Slug</label>
        
         <CustomInput
        v-model="slug"
        v-bind="slugAttrs"
        :error="errors.slug" />
      </div>

      <div class="mb-4 flex-1">
        <label for="description" class="form-label">Descripción</label>
        <CustomTextArea 
                
        v-model="description"
        v-bind="descriptionAttrs"
        :error="errors.description" />
      </div>

      <div class="flex flex-row gap-3">
        <div class="mb-4 flex-1">
          <label for="price" class="form-label">Precio</label>
          <CustomInput v-model.number="price" v-bind="priceAttrs" :error="errors.price"  />
        </div>

        <div class="mb-4 flex-1">
          <label for="stock" class="form-label">Inventario</label>
          <CustomInput v-model.number="stock" v-bind="stockAttrs" :error="errors.stock"  />
        </div>
      </div>

      <div class="mb-4 flex-1">
        <label for="sizes" class="form-label"> Tallas </label>

        <div class="flex">
          <button
            v-for="size of allSizes"
            :key="size"
            @click="toggleSize(size)"
            type="button"
            :class="[
              'p-2 rounded w-14 mr-2 flex-1',
              {
                'bg-blue-500 text-white': hasSize(size),
                'bg-blue-100': !hasSize(size),
              },
            ]"
          >
            {{ size }}
          </button>
        </div>

      </div>
    </div>
    <!-- Segunda columna -->
    <div class="first-col">
      <label for="stock" class="form-label  ">Imágenes</label>
      <!-- Row with scrollable horizontal -->
         <div class="flex p-2 overflow-x-auto space-x-8 w-full h-[265px] bg-gray-200 rounded">
        <div
  v-for="(image, index) in images"
  :key="image.key"
  class="relative flex-shrink-0"
>
<img
  :src="productImageUrl(image.value as string)"
  :alt="title"
  class="w-[250px] h-[250px] rounded"
/>
  <button
    type="button"
    class="absolute top-2 right-2 bg-blue-100 text-black w-8 h-8 rounded-full text-sm"
    @click="removeExistingImage(index)"
  >
    X
  </button>
</div>


<div
  v-for="(imageFile, index) in imageFiles"
  :key="imageFile.name"
  class="relative flex-shrink-0"
>
  <img
    :src="temporalImageUrl(imageFile)"
    class="w-[250px] h-[250px] rounded"
  />

  <button
    type="button"
    class="absolute top-2 right-2 bg-blue-200 text-black w-8 h-8 rounded-full text-sm"
    @click="removeNewImage(index)"
  >
    X
  </button>
</div>
      </div>
      <!-- Upload image -->
  <div class="col-span-2 my-2">
  <label for="image" class="form-label">Subir imagen</label>

  <input 
    multiple 
    type="file" 
    id="image"
    class="border border-gray-300 rounded-md w-full px-3 py-2 text-sm cursor-pointer
           file:bg-gray-300 file:text-gray-700 file:border file:border-grays-700
           file:px-3 file:py-1 file:rounded-md
           hover:file:bg-gray-300 transition" accept="image/*"
           @change="onFileChanged"

       

  />
</div>

       <div class="mb-4">
        <label for="stock" class="form-label">Género</label>
        <select v-model="gender" v-bind="genderAttrs" class='form-control border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'>
          <option value="">Seleccione</option>
          <option value="kid">Niño</option>
          <option value="women">Mujer</option>
          <option value="men">Hombre</option>
        </select>
        <span class="text-red-400" v-show="errors.gender">{{ errors.gender }}</span>
      </div>

      <!-- Botones Guardar y Eliminar -->
<div class="my-4 flex justify-end gap-4">

  <!-- Botón Guardar -->
  <button
    :disabled="isPending"
    type="submit"
    class="disabled:bg-gray-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    Guardar
  </button>

  <!-- Botón Eliminar -->
  <button
    @click="onDelete"
    type="button"
    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
  >
    Eliminar
  </button>

</div>
    </div>
    
  </form>

  <!--<div class="grid grid-cols-2 mt-2">
    <pre class="bg-blue-200 p-2">
      {{  JSON.stringify(values, null, 2) }}
    </pre>
      <pre class="bg-red-200 p-2">
      {{ JSON.stringify(errors, null, 2) }}
    </pre>
     <pre class="bg-green-200 p-2 col-span-2">
      {{ JSON.stringify(meta, null, 2) }}
    </pre>
  </div>-->
  
</template>

<script lang="ts" >
import { defineComponent, ref, watch, watchEffect } from "vue";
import { getProductById, createUpdateProductAction } from "@/modules/products/actions";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { useRouter } from 'vue-router';
import { useFieldArray, useForm } from "vee-validate";
import * as yup from 'yup';
import CustomInput from "@/modules/common/components/CustomInput.vue";
import CustomTextArea from "@/modules/common/components/CustomTextArea.vue";
import { useToast } from 'vue-toastification'
import { deleteProductAction } from "@/modules/products/actions/delete-Product-Action";
import { getImageUrl } from '@/helpers/getImageUrl';

const validationSchema = yup.object({
  title: yup.string().required('Este campo es super importante').min(3, 'Mínimo de 3 letras!!!'),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['men', 'women', 'kid']),
});


export default defineComponent({ 
  components:
  {
      CustomInput,
      CustomTextArea,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },

  setup(props) {

    const router = useRouter();
    const toast = useToast();

      const { data: product, isLoading, isError, refetch } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });

   const {
      mutate,
      isPending,
      isSuccess: isUpdateSuccess,
      data: updatedProduct,
    } = useMutation({
      mutationFn: createUpdateProductAction,
    });
;

    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema,
      //initialValues: product.value,
    });
    
    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');

  const { fields: images } = useFieldArray<string>('images');

    const imageFiles = ref<File[]>([]);


    const onSubmit = handleSubmit(async (values) => {
      const formValues = {
        ...values,
        images: [...values.images, ...imageFiles.value],
      };
      
      mutate(formValues);
    });


    const isDeleting = ref(false);

const onDelete = async () => {
  const confirmar = confirm("¿Seguro que deseas eliminar este producto?");
  if (!confirmar) return;

  try {
    isDeleting.value = true;

    await deleteProductAction(props.productId);

    toast.success("Producto eliminado correctamente");

    router.replace("/admin/products");

  } catch (error) {
    console.error(error);
    toast.error("Error eliminando el producto");
  } finally {
    isDeleting.value = false;
  }
};
const {
  mutate: deleteProduct,
  isSuccess: isDeleteSuccess
} = useMutation({
  mutationFn: deleteProductAction
});
watch(isDeleteSuccess, (value) => {
  if (!value) return;

  toast.success("Producto eliminado correctamente");
  router.replace("/admin/products");
});
   const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      const hasSize = currentSizes.includes(size);

      if (hasSize) {
        removeSize(currentSizes.indexOf(size));
      } else {
        pushSize(size);
      }
    };

    const onFileChanged = (event: Event) => {
      const fileInput = event.target as HTMLInputElement;
      const fileList = fileInput.files;

      if (!fileList) return;
      if (fileList.length === 0) return;

      for (const imageFile of fileList) {
        imageFiles.value.push(imageFile);
      }
    };


    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/products');
        return;
      }
    });


    watch ( product, () =>{

      if ( !product ) return;

      resetForm({
        values: product.value,
      })
    },{
        deep: true,
        immediate: true,
  

    }, );
    watch(isUpdateSuccess, (value) => {
      if (!value) return;

      toast.success('Producto actualizado correctamente');
      router.replace(`/admin/products/${updatedProduct.value!.id}`);
      router.replace('/admin/products');

      resetForm({
        values: updatedProduct.value,
      });
      imageFiles.value = [];
    });
    watch(
      () => props.productId,
      () => {
        refetch();
      },
      
    );
    const removeExistingImage = (index: number) => {
  images.value.splice(index, 1);
};

const removeNewImage = (index: number) => {
  imageFiles.value.splice(index, 1);
};

    const productImageUrl = (image: string) => getImageUrl(image);


    return {
      values,
      errors,
      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,
      meta,
      imageFiles,
      onFileChanged,
      product,
      isLoading,
      isError,

      allSizes: ["XS", "S", "M", "L", "XL", "XXL"],

      onSubmit,
      toggleSize,
      sizes,
      images,
      isPending,
      onDelete,
      isDeleting,
      removeExistingImage,
      removeNewImage,
      productImageUrl,
      


      hasSize: ( size: string )  =>{
        const currentSizes = sizes.value.map((s)=> s.value);
        return currentSizes.includes(size);
      },

      temporalImageUrl: ( imageFile: File ) =>{
        return URL.createObjectURL(imageFile);
      }
    };
  },
});
</script>


