var app =  new Vue({
    el: '#app',
    data: {
        product: 'socks',
        image: './assets/vmSocks-green-onWhite.jpg',
        inStock: true,
        details: ['80% cotton', '20% polyester', 'male/female'],
        variants: [
            {
                variantId: 111,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green-onWhite.jpg',
            },
            {
                variantId: 222,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue-onWhite.jpg',
            }
        ],
    cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        }
    }
})
