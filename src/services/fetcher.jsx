import { createClient } from "@supabase/supabase-js";

const SUPABASE_CONFIGS = {
    products: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwcWRzc2J6a2FmZ2xvYmFlZmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MjU2OTEsImV4cCI6MjA2NTIwMTY5MX0.Vod5vHET04ENRQUDFZHZVd7lAEO2k_NZP0VB0u0vXrE",
        url: "https://rpqdssbzkafglobaeflg.supabase.co"
    },
    users: {
        apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJud2R4ZHVqZ3pyemd0Zmt5c215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMjUxMDIsImV4cCI6MjA0MTgwMTEwMn0.D0nuB2PYrkIVuIsz3R2JqJLJYHmr8gXChAiZrTGMiHk",
        url: "https://bnwdxdujgzrzgtfkysmy.supabase.co"
    }
};

export function getClient(type = "products") {
    const { url, apikey } = SUPABASE_CONFIGS[type];
    return createClient(url, apikey);
}

export function get(type, endpoint) {
    const { apikey, url } = SUPABASE_CONFIGS[type];
    const baseUrl = `${url}/rest/v1/`;
    console.log(`🔄 Fetching ${type}: ${endpoint} at ${new Date().toLocaleTimeString()}`);
    return fetch(baseUrl + endpoint, {
        headers: {
            apikey,
            'Cache-Control': 'no-cache', // Force revalidation
            'Pragma': 'no-cache', // For older HTTP/1.0 caches
        },
    }).then((response) => {
        console.log(`📡 Response status: ${response.status} for ${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
}

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
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
}
