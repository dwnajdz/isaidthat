## Clone and run

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Clone repository and go to the cloned repo

   ```bash
   git clone https://github.com/dwnajdz/cloud_jobs.git
   ```

3. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]

   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_key
   STRIPE_SECRET_KEY=sk_key

   STRIPE_PRODUCT_PRICE_ID=pt_132124214
   STRIPE_WEBHOOK_SECRET=whsec_12345
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

   `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_PRODUCT_PRICE_ID`, `STRIPE_WEBHOOK_SECRET` can be found in [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)


### Local deployment

4. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The website should now be running on [localhost:3000](http://localhost:3000/).

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

### Production deployment

4. Install Docker on your machine.

5. Grant access to bash script `chmod u+x build_prod.sh`
6. Run it `sudo ./build_prod.sh`

## Deploy standalone verison (lightweight)

1. Grant access to bash script `chmod u+x build_standalone.sh`

If you want to create docker image `sudo ./build_standalone.sh true`
else just use `sudo ./build_standalone.sh false`