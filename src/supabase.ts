import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";

export default createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);
