<template>
    <div>
        <textarea
        :type="type"
        :value="modelValue" 
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value ?? '' )"
        @blur="$emit('blur')"
        :class="[
            'form-control border border-gray-300 rounded-md w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            { 'border-red-500': error }]"></textarea>

            <span class="text-red-400" v-if="error">{{ error}}</span>
        </div>




</template>

<script lang="ts" setup>
interface Props {
    modelValue?: string | number;
    error?: string;
    type?: 'text' | 'number';

}
withDefaults (defineProps<Props>(), {
    type: 'text',
});
defineEmits(['update:modelValue', 'blur']);



</script>
