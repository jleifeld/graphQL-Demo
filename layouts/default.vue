<template>
  <div class="app">
    <nav>
      <h2>Menü</h2>
      <nuxt-link to="/">Home</nuxt-link>
      <nuxt-link to="/products">Products</nuxt-link>
      <nuxt-link to="/checkout">Checkout</nuxt-link>
      <nuxt-link to="/login">Login</nuxt-link>
    </nav>

    <div class="content">
      <nuxt @checkout-finished="fetchCart" />
    </div>

    <div class="cart" v-if="cart">
      <h2>Cart:</h2>
      <ul>
        <li v-for="item in cart.lineItems">
          <strong>{{ item.label }}</strong>
          <br>
          Anzahl: {{ item.quantity }}
          <br>
          Preis: {{ item.price.totalPrice }}€
          <br>
          -------
        </li>
      </ul>
      <p>-------------</p>
      <p v-if="cart.price">Gesamtpreis: {{ cart.price.totalPrice }}€</p>
    </div>

  </div>
</template>

<script>
  import gql from 'graphql-tag';

  export default {
    computed: {
      cart() {
        return this.$store.state.cart;
      }
    },

    created() {
      this.fetchCart();

      this.$nuxt.$on('fetchCart', () => {
        this.fetchCart();
      });
    },

    methods: {
      fetchCart() {
        // Get initial cart state
        this.$apollo.mutate({
          // Query
          mutation: gql`mutation {
                        getCart(name: "f183ee5650cf4bdb8a774337575067a6") {
                            name,
                            price {
                                totalPrice
                            },
                            lineItems {
                                key,
                                quantity,
                                label,
                                cover {
                                    url
                                },
                                price {
                                    totalPrice
                                }
                            }
                        }
                      }`
        }).then((res) => {
          this.$store.commit('updateCart', res.data.getCart);
        })
      }
    }
  }
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.app {
  padding: 20px;
  display: grid;
  grid-template-columns: 150px 1fr 200px;
}

nav {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
nav h2 {
  margin-bottom: 10px;
}
nav a {
  margin-bottom: 10px;
}

p {
  margin-top: 10px;
}

.content {
  padding: 10px;
}

.cart {
  border-left: 1px solid #555;
  padding-left: 20px;
  margin-top: 20px;
}
.cart ul{
  padding-left: 0;
}
.cart ul li {
  list-style: none;
}

</style>
