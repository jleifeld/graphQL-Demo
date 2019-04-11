<template>
    <section class="container">
        <div class="product" v-if="!$apollo.loading">
            <h1>{{ product.name }}</h1>
            <img :src="product.media.edges[0].node.media.url" alt="">
            <p>{{ product.description }}</p>
            <p>
                Preis: <strong>{{ product.price.net }}</strong>
            </p>
        </div>
    </section>
</template>

<script>
    import gql from 'graphql-tag'

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
                        productId: this.routeId
                    }
                }
            }
        },

        data(){
            return {
                routeId: this.$route.params.id,
                product: {}
            }
        }
    }
</script>

<style>
    li {
        margin-top: 20px;
    }
</style>
