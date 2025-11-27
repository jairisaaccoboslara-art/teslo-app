<template>
  <IndecisionView />

  
  <hr />
  <MyCounter :value= "1" text=" " />
  <MyCounterScri :value ="2"/>
   <MyCounterScri2 :value ="3"/>

</template>

<script lang="ts" setup>
import IndecisionView from './views/indecisionView.vue';

import MyCounter from './ components/MyCounter.vue';
import MyCounterScri from './ components/MyCounterScri.vue';
import MyCounterScri2 from './ components/my-counter-script/MyCounterScri2.vue';

</script>
