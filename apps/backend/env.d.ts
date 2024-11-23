declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /** The URL of the database. */
      DATABASE_URL: string;
      /** Your bots token. */
      BOT_TOKEN: string;
      /** The decryption key used to decrypt webhooks. */
      DECRYPTION_KEY: string;
      /** Your bots client ID. */
      CLIENT_ID: string;

      /**
       * The url where the frontend is hosted
       *
       * ex: `https://my-bot.vercel.app`, default: `http://localhost:3000`
       */
      WEB_URL?: string;

      PORT?: number;
    }
  }
}

export {};
