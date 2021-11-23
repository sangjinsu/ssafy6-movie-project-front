<template>
  <b-container style="height: 100vh">
    <router-link
      :to="{ name: 'Login' }"
      class="text-decoration-none text-white float-end pt-5"
    >
      <b-button size="lg">Login</b-button>
    </router-link>
    <div class="h-100 d-flex align-items-center">
      <figure class="text-start">
        <blockquote class="blockquote text-white">
          <h1>
            취향에 따라 골라보는 다양한<br />
            컨텐츠가 모두 한자리에
          </h1>
        </blockquote>
        <figcaption class="blockquote-footer text-white">
          <h3>지금 바로 회원이 되어보세요</h3>
        </figcaption>
      </figure>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
