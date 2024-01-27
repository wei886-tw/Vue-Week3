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
        title: '',
        imagesUrl: [],
      },
    };
  },

  methods: {
    openModal(status, product) {
      if (status === 'new') {
        this.tempProduct = {};
        this.isNew = true;
        productModal.show();
      }

      else if (status === 'edit') {
        this.tempProduct = { ...product };
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
      let link = `${this.url}/v2/api/${this.api_path}/admin/product/${this.tempProduct.id}`;
      let http = 'put';

      if (this.isNew) {
        link = `${this.url}/v2/api/${this.api_path}/admin/product`;
        http = 'post'
      }

      axios[http](link, { data: this.tempProduct }).then((res) => {
        alert(res.data.message);
        productModal.hide();
        this.getData();  // 取得所有產品的函式
      }).catch((err) => {
        console.dir(err)
        
      })
    },

    checkAdmin() {
      const url = `${this.url}/api/user/check`;
      axios
        .post(url)
        .then(() => {
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