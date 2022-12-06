import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import errorImage from "~/assets/error_image.jpeg";
import indexStyles from "~/styles/index.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "DEPT - SpaceX",
  viewport: "width=device-width,initial-scale=1",
});
export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: indexStyles,
    },
  ];
};
export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
export function ErrorBoundary({ error }: { error: any }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <div>
          <div className='errorImage'>
            <img src={errorImage} alt='Oops there was an error' />
          </div>
          <h1 className='errorText'>{error.message}</h1>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
