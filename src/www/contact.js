export function contact() {
  return {
    success: undefined,
    sending: false,

    submit: function (event) {
      event.preventDefault();

      if (this.success != undefined) return;

      const formData = new FormData(this.$el);
      const entries = Object.fromEntries(formData);

      const api =
        process.env.NODE_ENV == "production"
          ? "/api/contact"
          : "http://localhost:3000/contact";

      fetch(api, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entries),
      })
        .then((response) => {
          this.success = response.status == 200;
          this.sending = false;
        })
        .catch((_) => {
          this.success = false;
          this.sending = false;
        });

      this.sending = true;
    },
  };
}
