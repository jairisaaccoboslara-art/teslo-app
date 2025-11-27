
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
  :key="image.value"
  class="relative flex-shrink-0"
>
  <img
    :src="image.value"
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



<script src="./ProductView.ts" lang="ts">
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';



</script>


