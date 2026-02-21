# Dev Debugging Assessment

A hard-level developer debugging assessment platform hosted on GitHub Pages, powered by Supabase and Resend.

---

## Stack

- **GitHub Pages** — hosts `index.html` (free, static)
- **Supabase Edge Function** — handles form submission + saves to DB
- **Resend** — sends results email

---

## Setup

### 1. Supabase — Create the database table

- Go to your Supabase project → **SQL Editor → New Query**
- Paste and run the contents of `supabase/schema.sql`

### 2. Supabase — Deploy the Edge Function

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref pjejjlloimhfaoxiwdrq

# Set your Resend API key as a secret
supabase secrets set RESEND_API_KEY=your_resend_api_key_here

# Deploy the function
supabase functions deploy submit-assessment
```

### 3. Update `index.html`

Find this line and replace `YOUR_PROJECT_REF` with your actual Supabase project ref:

```js
const response = await fetch('https://YOUR_PROJECT_REF.supabase.co/functions/v1/submit-assessment', {
```

Your project ref is in Supabase → **Settings → General**.

### 4. GitHub Pages

- Push everything to your GitHub repo
- Go to **Settings → Pages → Source → Deploy from branch → main / root**
- Your site will be live at `https://yourusername.github.io/repo-name`

---

## Environment Variables (Supabase Secrets)

| Secret | Description |
|---|---|
| `RESEND_API_KEY` | Your key from [resend.com/api-keys](https://resend.com/api-keys) |

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are automatically available inside Edge Functions — no setup needed.

---

## Viewing Submissions

All submissions are saved to the `assessments` table in your Supabase project.  
Go to **Table Editor → assessments** to browse results.
