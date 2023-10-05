export default {
  methods: {
    processErrorMessage(status, message) {
      if (status != "success") {
        this.$toast.error(message, { position: "top-right" });
        throw new Error(message);
      }
    },
  },
};
