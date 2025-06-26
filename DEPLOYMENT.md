# Alternative Deployment Options for Next.js Application

This guide provides alternative deployment options for your Next.js application if you're experiencing issues with Vercel deployment.

## Static Export Deployment

Your Next.js application has been configured to generate a static export, which can be deployed to any static hosting provider.

### Generate Static Export

Run the following command to build and export your application:

```bash
npm run export
```

This will create an `out` directory containing your static site.

### Deployment Options

#### 1. Netlify

1. Create an account on [Netlify](https://www.netlify.com/)
2. Install Netlify CLI: `npm install -g netlify-cli`
3. Deploy your site: `netlify deploy --dir=out --prod`

#### 2. GitHub Pages

1. Create a new repository on GitHub
2. Push your code to the repository
3. Configure GitHub Pages to use the `out` directory
4. Add a `.nojekyll` file to the `out` directory to prevent GitHub from ignoring files that start with an underscore

#### 3. Firebase Hosting

1. Create a Firebase project
2. Install Firebase CLI: `npm install -g firebase-tools`
3. Initialize Firebase: `firebase init hosting`
4. Configure Firebase to use the `out` directory
5. Deploy your site: `firebase deploy --only hosting`

#### 4. AWS Amplify

1. Create an AWS account
2. Install AWS Amplify CLI: `npm install -g @aws-amplify/cli`
3. Configure Amplify: `amplify configure`
4. Initialize Amplify: `amplify init`
5. Add hosting: `amplify add hosting`
6. Deploy your site: `amplify publish`

#### 5. Cloudflare Pages

1. Create a Cloudflare account
2. Create a new Pages project
3. Connect your GitHub repository
4. Configure the build settings:
   - Build command: `npm run export`
   - Output directory: `out`

## Troubleshooting

If you encounter any issues with the static export, try the following:

1. Make sure all your API routes are properly handled for static export
2. Check for any client-side only code that might be causing issues
3. Ensure all your data fetching is compatible with static generation

## Additional Resources

- [Next.js Static Export Documentation](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
- [Netlify Deployment Documentation](https://docs.netlify.com/site-deploys/create-deploys/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [AWS Amplify Documentation](https://docs.amplify.aws/start/q/integration/js/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)