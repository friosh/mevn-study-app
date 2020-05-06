<template>
  <div class="loader"></div>
</template>

<script>
  export default {
    name: 'loader',
  };
</script>

<style scoped>
 .loader {
   height: 1rem;
   width: 1rem;
   display: flex;
   justify-content: center;
   align-items: center;
   animation: spin 1s linear infinite;
   border: 2px solid transparent;
   border-image-source: linear-gradient(to left, #333, #ccc);
   /*border-right-color: #666;*/
   /*border-top-color: #aaa;*/
   border-radius: 50%;


   @keyframes spin {
     from {
       transform: rotate(0);
     }

     to {
       transform: rotate(360deg);
     }

   }
 }
</style>
