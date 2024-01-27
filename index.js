const {createApp} = Vue
const app = createApp({
    data() {
        return {
            user: {
                username: "",
                password: "",
            },
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            api_path: 'wei123',
        };
    },
    methods: {
        login() {
            const apiUrl = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            axios
                .post(apiUrl, this.user)
                .then((res) => {
                    const { token, expired } = res.data;
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;
                    window.location = 'editProducts.html';
                })
                .catch((err) => {
                    alert(err.response.data.message);
                });
        },
    },
}).mount("#app");

