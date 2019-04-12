<template>
    <section class="container">
        <div class="product" v-if="!$apollo.loading">
            <h1>{{ product.name }}</h1>
            <img :src="product.media.edges[0].node.media.url" alt="">
            <p>{{ product.description }}</p>
            <p>
                Preis: <strong>{{ product.price.gross }}</strong>
            </p>
            <label for="quantity"></label>
            <input v-model="quantity" id="quantity" type="number">
            <button @click="addToCart">Buy,buy,buy</button>
        </div>
    </section>
</template>

<script>
    import gql from 'graphql-tag';

    export default {

        apollo: {
            product: {
                query: gql`query($productId: ID!) {
                  product(id: $productId) {
                    id,
                    name,
                    description,
                    price,
                    media {
                      edges {
                        node {
                          id,
                          media {
                            id,
                            url
                          }
                        }
                      }
                    }
                  }
                }`,
                loadingKey: 'loading',

                // Reactive parameters
                variables() {
                    return {
                        productId: this.productId
                    }
                }
            }
        },

        data(){
            return {
                productId: this.$route.params.id,
                product: {},
                quantity: 1
            }
        },

        methods: {
            addToCart() {
                this.$apollo.mutate({
                    // Query
                    mutation: gql`mutation ($productId: ID!, $quantity: Int!) {
                        addToCart(productId: $productId, quantity: $quantity) {
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
                        productId: this.productId,
                        quantity: this.quantity
                    }
                }).then((res) => {
                    // Result
                    this.$store.commit('updateCart', res.data.addToCart);

                })
            }
        }
    }
</script>

<style>
    li {
        margin-top: 20px;
    }
</style>
