import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://jjewrcjhtqwapmssonfo.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZXdyY2podHF3YXBtc3NvbmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgwNjIwNDUsImV4cCI6MjA0MzYzODA0NX0.zqk2RUxq6L74-n4b137mOm4LM85K-d8Z9_XzUFbW7i0"
);