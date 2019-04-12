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
          Anzahl: <input type="text" :value="item.quantity" @input="updatePrice(item, $event)">
          <br>
          Preis:
          {{ item.price.totalPrice }}€
          <br>
          <button @click="removeFromCart(item.key)">Entfernen</button>
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
      },

      removeFromCart(itemId) {
        this.$apollo.mutate({
          // Query
          mutation: gql`mutation ($itemId: ID!) {
                        removeLineItem(key: $itemId) {
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
                      }`,
          // Parameters
          variables: {
            itemId: itemId
          }
        }).then((res) => {
          // Result
          this.$store.commit('updateCart', res.data.removeLineItem);

        })
      },

      updatePrice(item, event) {
        if (event.data <= 0) {
          this.removeFromCart(item.key);
          return;
        }
          this.$apollo.mutate({
              // Query
              mutation: gql`mutation ($itemId: ID!, $quantity: Int) {
                              updateLineItem(key: $itemId, quantity: $quantity) {
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
                            }`,
              // Parameters
              variables: {
                  itemId: item.key,
                  quantity: event.data
              }
          }).then((res) => {
              // Result
              this.$store.commit('updateCart', res.data.updateLineItem);

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
