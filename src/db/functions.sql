CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SET search_path = public, pg_temp
STABLE
SECURITY DEFINER
AS $$
DECLARE
    claims    jsonb;
    user_role public.user_role;
BEGIN
    -- Look up the user's role from profiles using the JWT subject (sub) claim
    SELECT role
      INTO user_role
      FROM public.profiles
     WHERE id = (event->>'user_id')::uuid;

    -- Ensure we have a JSON object to work with
    claims := COALESCE(event->'claims', '{}'::jsonb);

    -- Add/overwrite the user_role claim
    IF user_role IS NOT NULL THEN
        claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role::text));
    ELSE
        claims := jsonb_set(claims, '{user_role}', to_jsonb('student'::text));
    END IF;

    -- Put the updated claims back into the event payload
    event := jsonb_set(event, '{claims}', claims);

    RETURN event;
END;
$$;