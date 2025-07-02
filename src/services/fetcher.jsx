import { createClient } from "@supabase/supabase-js";

const apikey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwcWRzc2J6a2FmZ2xvYmFlZmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MjU2OTEsImV4cCI6MjA2NTIwMTY5MX0.Vod5vHET04ENRQUDFZHZVd7lAEO2k_NZP0VB0u0vXrE";

const supabaseURL = "https://rpqdssbzkafglobaeflg.supabase.co";
const BASE_URL = supabaseURL + "/rest/v1/";


export const supabase = createClient(supabaseURL, apikey);

export function get(endpoint) {
    return fetch(BASE_URL + endpoint, {
        headers: {
            apikey,
        },
    }).then((response) => response.json());
}

export function callApi(method, endpoint, data) {
    return fetch(BASE_URL + endpoint, {
        method,
        headers: {
            apikey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}


