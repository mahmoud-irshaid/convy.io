-- Add service role bypass policy for users table
DROP POLICY IF EXISTS "Service role can manage all users" ON public.users;
CREATE POLICY "Service role can manage all users" ON public.users
  USING (true)
  WITH CHECK (true);

-- Add service role bypass policy for subscriptions table
DROP POLICY IF EXISTS "Service role can manage all subscriptions" ON public.subscriptions;
CREATE POLICY "Service role can manage all subscriptions" ON public.subscriptions
  USING (true)
  WITH CHECK (true);

-- Enable realtime for users and subscriptions
alter publication supabase_realtime add table users;
alter publication supabase_realtime add table subscriptions;
