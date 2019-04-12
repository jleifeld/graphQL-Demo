<template>
    <section class="container">
        <h1>Login</h1>

        <input v-model="username" type="text" placeholder="E-Mail">
        <input v-model="password" type="password" placeholder="Passwort">

        <button @click="loginHandler">Login</button>

        <p>
            {{ response }}
        </p>

    </section>
</template>

<script>
    import gql from 'graphql-tag'

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
        },

        data() {
            return {
                username: '',
                password: '',
                response: ''
            }
        },

        methods: {
            loginHandler() {
                this.$apollo.mutate({
                    // Query
                    mutation: gql`mutation ($username: String!, $password: String!) {
                        login(email: $username, password: $password)
                      }`,
                    // Parameters
                    variables: {
                        username: this.username,
                        password: this.password
                    }
                }).then((data) => {
                    // Result
                    this.response = data;
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
