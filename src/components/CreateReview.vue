<template>
  <div>
    <b-container fluid>
      <b-row class="my-1" v-for="type in types" :key="type">
        <b-col sm="3">
          <label :for="`type-${type}`"
            ><code>{{ type }}</code
            >:</label
          >
        </b-col>
        <b-col sm="9">
          <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "CreateReview",
  data() {
    return {
      types: ["text", "text", "number"],
    };
  },
};
</script>

<style></style>
