import { createClient } from '@supabase/supabase-js';
import { g as getEnv$1, s as setOnSetGetEnv } from './runtime_1tkDUGik.mjs';

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-check

// @ts-expect-error
/** @returns {string} */
// used while generating the virtual module
// biome-ignore lint/correctness/noUnusedFunctionParameters: `key` is used by the generated code
const getEnv = (key) => {
	return getEnv$1(key);
};

const getSecret = (key) => {
	return getEnv(key);
};

setOnSetGetEnv(() => {
	
});

const supabase = () => {
  const supabaseUrl = getSecret("SUPABASE_URL");
  const supabaseAnonKey = getSecret("SUPABASE_ANON_KEY");
  const supabase2 = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      global: {
        fetch: (...args) => fetch(...args)
      }
    }
  );
  return supabase2;
};

export { getSecret as g, supabase as s };
