var eventBus = new Vue()

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img :src="image">
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In stock</p>
            <p v-else>Out of stock</p>
            <p>User is premium: {{ premium }}</p>
            <p>Shipping: {{ shipping }}</p>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 :style="{ backgroundColor: variant.variantColor }"
                 @mouseover="updateProduct(index)">
            </div>
            <button @click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >Add to cart
            </button>
            
        </div>
        
        <product-tabs :reviews="reviews"></product-tabs>
        
     </div>
    `,
    data() {
        return {
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
            reviews: []
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
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
            // if(this.variants[this.selectedVariant].variantQuantity > 0 ) {
            //     return true
            // } else {
            //     return false
            // }
        },
        shipping() {
            if (this.premium) {
                return "Free"
            } else {
                return "12 zł"
            }
        }
    }
})


Vue.component('product-review', {
    template: `
<div>
<form class="review-form" @submit.prevent="onSubmit">
    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
    </p>

    <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review" placeholder="write your review here"></textarea>
    </p>
    
    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
    </p>
    
    <p v-if="errors.length">
    <b>"Please correct the following error(s):</b>
    <ul>
        <li v-for="error in errors">{{ error }}</li>
    </ul>
    </p>
    
    <p>
        <input type="submit" value="Submit">
    </p>
    
</form>
</div>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.rating && this.review) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null,
                    this.review = null,
                    this.rating = null
            } else {
                if (!this.name) this.errors.push("Name required")
                if (!this.review) this.errors.push("Review required")
                if (!this.rating) this.errors.push("Rating required")
            }
        }
    }
})


Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },
    template: `
<div>
    <div>
        <span class="tab" 
        :class="{activeTab: selectedTab === tab}"
        v-for="(tab, index) in tabs" 
        :key="index"
        @click="selectedTab=tab"
        >{{ tab }}</span>
    </div>
    
        <div v-show="selectedTab === 'reviews'">
        <p v-show="!reviews.length">There are no reviews yet</p>
        <ul>
            <li v-for="review in reviews">
            <p>{{review.name}}</p>
            <p>Rating: {{review.rating}}</p>
            <p>{{review.review}}</p>
            </li>
        </ul>
        </div>
        <div v-show="selectedTab === 'make a review'">
        <product-review></product-review>
    </div>
</div>
    `,
    data() {
        return {
            tabs: ['reviews', 'make a review'],
            selectedTab: 'reviews'

        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
})
