# Link cutter 2.0
*A link shortening site for personal use*

# Setup
1. Download this repo
2. Rename the `.env.example` file to `.env` and edit the values there
3. Runb`npm run build`
4. Insert a default token into the postgres database. We recommend using this command:
`insert into tokens (label, token) value ('admin', lower(substr(md5(random()::text), 0, 32)));`
    - Be sure to hold onto whatever is generated, as this is your access token

You can now use `node server` from the root to run the website!