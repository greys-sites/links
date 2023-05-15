# Link cutter 2.0
*A link shortening site for personal use*

# Setup
1. Download this repo
2. Rename the `frontend/example.env` file to `.env` and edit the values there
3. Do the same to the root `.env` file, and be sure to set up the postgres database
4. `cd frontend && npm run build`
5. Insert a default token into the postgres database. We recommend using this command:
`insert into tokens (label, token) value ('admin', lower(substr(md5(random()::text), 0, 32)));`
    - Be sure to hold onto whatever is generated, as this is your access token

You can now use `node -r dotenv/config build` from the `frontend`
folder to run the client, and `node server` from the root to run the server

If you're planning to run this in a true production environment,
you'll likely want to expose the client and API. We recommend using NginX for this