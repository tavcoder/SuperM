/**
 * Supabase API client and utilities for data fetching
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_CONFIGS = {
    products: {
        apikey: import.meta.env.VITE_SUPABASE_PRODUCTS_KEY,
        url: import.meta.env.VITE_SUPABASE_PRODUCTS_URL
    },
    users: {
        apikey: import.meta.env.VITE_SUPABASE_USERS_KEY,
        url: import.meta.env.VITE_SUPABASE_USERS_URL 
    }
};

export const ERROR_MESSAGES = {
    400: "Oops! Something went wrong with your request. Please check your input and try again.",
    401: "Oops! You need to log in to continue.",
    403: "Oops! You don't have permission to do that.",
    404: "Oops! We couldn't find what you're looking for.",
    409: "Oops! There was a conflict with your request. Please refresh the page and try again.",
    422: "Oops! Some information seems incorrect. Please check and try again.",
    500: "Oops! Something went wrong on our end. Please try again later.",
    503: "Oops! Our shop is temporarily unavailable. Please try again in a few minutes.",
    network: "Oops! It looks like there's a connection issue. Please check your internet and try again."
};

/**
 * Create a Supabase client for specified database
 * @param {string} type - Database type ('products' or 'users')
 * @returns {Object} Supabase client instance
 */
export function getClient(type = "products") {
    const { url, apikey } = SUPABASE_CONFIGS[type];
    return createClient(url, apikey);
}

/**
 * Fetch data from Supabase REST API
 * @param {string} type - Database type ('products' or 'users')
 * @param {string} endpoint - API endpoint path
 * @returns {Promise<Object>} Parsed JSON response
 */
export function get(type, endpoint) {
    const { apikey, url } = SUPABASE_CONFIGS[type];
    const baseUrl = `${url}/rest/v1/`;

    return fetch(baseUrl + endpoint, {
        headers: {
            apikey,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
        },
    })
        .then((response) => {

            if (!response.ok) {
                const errorMessage = ERROR_MESSAGES[response.status] || "Oops! Something unexpected happened. Please try again.";
                throw { status: response.status, message: errorMessage };
            }
            return response.json();
        })
        .catch((error) => {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error(ERROR_MESSAGES.network);
            }
            throw error;
        });
}

/**
 * Make POST/PUT/DELETE requests to Supabase API
 * @param {string} type - Database type ('products' or 'users')
 * @param {string} method - HTTP method (POST, PUT, DELETE)
 * @param {string} endpoint - API endpoint path
 * @param {Object} data - Request body data
 * @returns {Promise<Object>} Parsed JSON response
 */
export function callApi(type, method, endpoint, data) {
    const { apikey, url } = SUPABASE_CONFIGS[type];
    const baseUrl = `${url}/rest/v1/`;

    return fetch(baseUrl + endpoint, {
        method,
        headers: {
            apikey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                const errorMessage = ERROR_MESSAGES[response.status] || "Oops! Something unexpected happened. Please try again.";
                throw { status: response.status, message: errorMessage };
            }
            return response.json();
        })
        .catch((error) => {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error(ERROR_MESSAGES.network);
            }
            throw error;
        });
}