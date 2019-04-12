import gql from 'graphql-tag';

export const state = () => ({
    cart: {}
});

export const mutations = {
    updateCart (state, newCart) {
        state.cart = newCart;
    }
};