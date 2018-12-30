var app =  new Vue({
    el: '#app',
    data: {
        product: 'socks',
        brand: 'Vue special',
        selectedVariant: 0,
        details: ['80% cotton', '20% polyester', 'male/female'],
        variants: [
            {
                variantId: 111,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green-onWhite.jpg',
                variantQuantity: 11
            },
            {
                variantId: 222,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0
            }
        ],
    cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
})
