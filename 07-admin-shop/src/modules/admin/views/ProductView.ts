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
      console.log("FORM DATA ENVIADA:", formValues);
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
