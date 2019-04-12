<template>
    <section class="container">
        <div class="checkout" v-if="!$apollo.loading">
            <h1>Checkout</h1>
            <p>The simplest checkout ever.</p>
            <button @click="checkoutHandler">Checkout</button>

            <p v-if="orderId">
                Your order id is: "{{ orderId }}". <br>
                <button @click="payHandler">Pay order</button>
            </p>
        </div>
    </section>
</template>

<script>
    import gql from 'graphql-tag';

    export default {

        data(){
            return {
                orderId: '',
                finishUrl: 'https://www.google.com/search?biw=1680&bih=916&tbm=isch&sa=1&ei=mD-wXOWxE4idkgXxoq2ICQ&q=cats&oq=cats&gs_l=img.3..0i67j0l4j0i67j0l3j0i67.594.594..943...0.0..0.49.49.1......0....1..gws-wiz-img.V5QdH6Fe3i0'
            }
        },

        computed: {
            cart() {
                return this.$store.state.cart;
            }
        },

        methods: {
            checkoutHandler() {
                this.$apollo.mutate({
                    // Query
                    mutation: gql`mutation {
                        checkout {
                            id
                        }
                      }`
                }).then((res) => {
                    this.orderId = res.data.checkout.id;
                    this.$nuxt.$emit('fetchCart');
                })
            },
            payHandler() {
                this.$apollo.mutate({
                    // Query
                    mutation: gql`mutation ($orderId: ID!, $finishUrl: String!) {
                        pay(orderId: $orderId, finishUrl: $finishUrl)
                      }`,
                    // Parameters
                    variables: {
                        orderId: this.orderId,
                        finishUrl: this.finishUrl
                    }
                }).then((res) => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style>
</style>
