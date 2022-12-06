import type { LinksFunction } from "@remix-run/node";
import indexStyles from "~/styles/index.css";
import logoUrl from "~/assets/spaceX_logo.png";
import {
  Form,
  NavLink,
  Outlet,
  useLocation,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import React from "react";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: indexStyles,
    },
  ];
};

export default function Launches() {
  const submit = useSubmit();
  const location = useLocation();
  const transition = useTransition();

  React.useEffect(() => {
    let queryString = location.search.split("?search=")[1];
    let inputElement = document.getElementById("q")! as HTMLInputElement;
    inputElement.value = queryString ?? "";
  }, [location.search]);

  return (
    <>
      <header
        style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
      >
        <div className='logo_image'>
          <img src={logoUrl} alt='' />
        </div>
        <h2 className='top_title'>Launches</h2>
        <nav>
          <div
            className={
              location.pathname === "/launches/all" ? "active_border" : ""
            }
          >
            <NavLink
              prefetch='intent'
              style={({ isActive }) => (isActive ? {} : { color: "#FFFFFF78" })}
              to='all'
            >
              All
            </NavLink>
          </div>
          <div
            className={
              location.pathname === "/launches/favourites"
                ? "active_border"
                : ""
            }
          >
            <NavLink
              prefetch='intent'
              style={({ isActive }) => (isActive ? {} : { color: "#FFFFFF78" })}
              to='favourites'
            >
              Favourites
            </NavLink>
          </div>
        </nav>
        <div id='search-form-container'>
          <Form replace id='search-form' role='search' action='/launches/all'>
            <input
              autoComplete='off'
              id='q'
              aria-label='Search Launches'
              placeholder={"Search all launches..."}
              type='search'
              name='search'
              defaultValue={location.search.split("?search=")[1]}
              onChange={(event) => submit(event.currentTarget.form)}
            />
            {transition.state !== "submitting" ? (
              <div
                style={{ position: "absolute", left: "8%", bottom: "5px" }}
                id='search-icon'
              >
                🔍
              </div>
            ) : (
              <div id='search-spinner' aria-hidden hidden={false} />
            )}
            <div className='sr-only' aria-live='polite'></div>
          </Form>
        </div>
      </header>
      <Outlet />
    </>
  );
}
