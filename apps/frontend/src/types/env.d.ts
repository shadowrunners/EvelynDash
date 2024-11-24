declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** The bot's client secret. */
      CLIENT_SECRET: string;
      /** The URL to where the dashboard is hosted. */
      APP_URL: string;
      /** The URL of the dashboard. */
      NEXTAUTH_URL: string;
      /** The secret used to encrypt / decrypt JWT tokens. */
      NEXTAUTH_SECRET: string;
      /** The URL to the dashboard's API. */
      NEXT_PUBLIC_API_ENDPOINT: string;
      /** The bot's client ID. */
      NEXT_PUBLIC_CLIENT_ID: string;

      OWNER_ID: string;

      /**
       * The url where the frontend is hosted
       *
       * ex: `https://my-bot.vercel.app`, default: `http://localhost:3000`
       */
      WEB_URL?: string;
    }
  }
}
export {};
