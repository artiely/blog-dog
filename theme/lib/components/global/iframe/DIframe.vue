<template>
<div class="iframe-box">
<div class="iframe-ctrl">
  <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle></g></svg>
</div>
  <iframe  name="embed_dom" frameborder="0" style="display:block;width:100%;" :src="src"></iframe>
</div>
</template>
<script >
export default{
  name:'DIframe',
  props:['src']
}
</script>
<style lang="scss">
.iframe-box{
  border-radius:6px;
  overflow:hidden;
  padding-top:5px;
  background-color:var(--code-bg-color);
  margin:2em auto;
  iframe{
    height:auto;
    min-height:300px;
  }
  .iframe-ctrl{
    padding-left:1em;
  }
}
</style>