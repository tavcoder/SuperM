import { createClient } from "@supabase/supabase-js";

const SUPABASE_CONFIGS = {
    products: {
        apikey: import.meta.env.VITE_SUPABASE_PRODUCTS_ANON_KEY,
        url: import.meta.env.VITE_SUPABASE_PRODUCTS_URL,
    },
    users: {
        apikey: import.meta.env.VITE_SUPABASE_USERS_ANON_KEY,
        url: import.meta.env.VITE_SUPABASE_USERS_URL,
    },
};

export const ERROR_MESSAGES = {
    400: "Oops! Something went wrong with your request. Please check your input and try again.",
    401: "Oops! You need to log in to continue.",
    403: "Oops! You dont have permission to get that.",
    404: "Oops! We couldnt find what youre looking for.",
    409: "Oops! There was a conflict with your request. Please refresh the page and try again.",
    422: "Oops! Some information seems incorrect. Please check and try again.",
    500: "Oops! Something went wrong on our end. Please try again.",
    503: "Oops! Our shop is temporarily unavailable. Please try again in a few minutes.",
    network: "Oops! It looks like theres a connection issue. Please check your network and try again.",
};

function getConfig(type) {
    const config = SUPABASE_CONFIGS[type];
    if (!config?.url || !config?.apikey) {
        throw new Error(`Missing Supabase environment variables for "${type}".`);
    }
    return config;
}

export function getClient(type = "products") {
    const { url, apikey } = getConfig(type);
    return createClient(url, apikey);
}

export function get(type, endpoint) {
    const { apikey, url } = getConfig(type);
    const baseUrl = `${url}/rest/v1/`;
    return fetch(baseUrl + endpoint, {
        headers: {
            apikey,
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
        },
    }).then((response) => {
        if (!response.ok) {
            const errorMessage = ERROR_MESSAGES[response.status] || "Oops! Something unexpected happened. Please try again.";
            throw { status: response.status, message: errorMessage };
        }
        return response.json();
    }).catch((error) => {
        if (error.name === "TypeError" && error.message.includes("fetch")) {
            throw new Error(ERROR_MESSAGES.network);
        }
        throw error;
    });
}

export function callApi(type, method, endpoint, data) {
    const { apikey, url } = getConfig(type);
    const baseUrl = `${url}/rest/v1/`;
    return fetch(baseUrl + endpoint, {
        method,
        headers: {
            apikey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => {
        if (!response.ok) {
            const errorMessage = ERROR_MESSAGES[response.status] || "Oops! Something unexpected happened. Please try again.";
            throw { status: response.status, message: errorMessage };
        }
        return response.json();
    }).catch((error) => {
        if (error.name === "TypeError" && error.message.includes("fetch")) {
            throw new Error(ERROR_MESSAGES.network);
        }
        throw error;
    });
}
