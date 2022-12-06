import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import indexStyles from "~/styles/index.css";
import { redirect } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: indexStyles,
    },
  ];
};

export const loader: LoaderFunction = async () => {
  return redirect("/launches/all");
};
export default function Home() {
  return <></>;
}
