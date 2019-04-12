<template>
    <section class="container">
        <h1>Products</h1>
        <ul v-if="!$apollo.loading">
            <li v-for="product in products.edges" :key="product.node.id">
                <nuxt-link :to="`/products/${product.node.id}`">{{ product.node.name }}</nuxt-link>
            </li>
        </ul>
    </section>
</template>

<script>
    import gql from 'graphql-tag';

    export default {
        apollo: {
            products: {
                prefetch: true,
                query: gql`
                query {
                  products {
                    total,
                    edges {
                        node {
                            id,
                            name
                        }
                    }
                  }
                }
                `
            }
        }
    }
</script>

<style>
    li {
        margin-top: 20px;
    }
</style>
