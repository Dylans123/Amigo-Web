<template>
    <div>
        Home
    </div>
</template>
<script>
export default {
  mounted: () => {
    console.log("I just mounted");
    console.log(document.cookie);
  }
}
</script>