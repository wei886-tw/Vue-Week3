let productModal = null;
let delProductModal = ``;


const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io',
      api_path: 'wei123',
      allProducts: [],
      isNew: false,
      tempProduct: {
        imageUrl: [],
        imagesUrl: [],
      },
    };
  },

  methods: {
    openModal(status, product) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      }

      else if (status === 'edit') {
        this.tempProduct = { ...product };
        this.new = false;
        productModal.show();
      }

      else if (status === 'delete') {
        this.tempProduct = { ...product };
        delProductModal.show();
      }
    },
    getProducts() {
      axios.get(`${this.url}/v2/api/${this.api_path}/admin/products`)
        .then(res => {
          this.allProducts = res.data.products;
        })

        .catch(err => {
          console.log(err);
        });
    },

    delProduct() {
      axios.delete(`${this.url}/v2/api/${this.api_path}/admin/product/${this.tempProduct.id}`)
        .then(res => {
          delProductModal.hide();
          this.getProducts();
        })
        .catch(err => {
          console.log(err);
        });
    },

    updateProduct() {
      if (this.isNew == true) {
        axios.post(`${this.url}/v2/api/${this.api_path}/admin/product`, { data: this.tempProduct })
          .then(res => {
            productModal.hide();
            alert("新增產品成功");
            this.isNew = false;
            this.tempProduct = {};
            this.getProducts();

          })
          .catch(err => {
            alert(err.data.message)
          });
      }
      else if (this.isNew == false) {
        axios.put(`${this.url}/v2/api/${this.api_path}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
          .then(res => {
            productModal.hide();
            alert("編輯產品成功");
            this.getProducts();
            this.tempProduct = {};
          })
          .catch(err => {
            alert(err.data.message)
          });
      };
    },

    addImg() {
      this.imagesUrl;
    },

    checkAdmin() {
      const link = `${this.url}/api/user/check`;
      axios
        .post(link)
        .then((res) => {
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'index.html';
        });
    },

  },

  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();

    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false,
      backdrop: 'static'
    });

    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false,
      backdrop: 'static'
    });
  }
});

app.mount('#app');