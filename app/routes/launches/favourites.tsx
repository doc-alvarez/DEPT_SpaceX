import { useCatch, useLoaderData } from "@remix-run/react";
import LaunchItem from "~/components/LaunchItem";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { db } from "~/utils/db.server";
import errorImage from "~/assets/error_image.jpeg";

//ServerSide
export const action: ActionFunction = async ({ request }) => {
  const form = (await request.formData()) as FormData;
  let isFavourite: any = form.get("favourite");
  const mission_name: any = form.get("mission_name");
  const _record = form.get("launch_record") as FormDataEntryValue;
  const record: any = JSON.parse(_record as string);

  try {
    if (isFavourite === "false") {
      await db.launches.update({
        where: { mission_name: mission_name },
        data: {
          isFavourite: false,
        },
      });
      await db.favourites.delete({
        where: { mission_name: mission_name },
      });
    } else {
      await db.favourites.create({
        data: {
          ...record,
        },
      });
      await db.launches.update({
        where: { mission_name: mission_name },
        data: {
          isFavourite: true,
        },
      });
      await db.favourites.update({
        where: { mission_name: mission_name },
        data: {
          isFavourite: true,
        },
      });
    }

    return json({ ok: true });
  } catch (error) {
    throw new Response("Server Error", {
      status: 500,
      statusText: "Problem handling favourite selection, try later",
    });
  }
};
export const loader: LoaderFunction = async () => {
  try {
    const storedFavourites = await db.favourites.findMany();
    return json(storedFavourites);
  } catch (error) {
    throw new Response("Server Error", {
      status: 500,
      statusText: "Problem fetching favourites, try later",
    });
  }
};

//ClientSide
export default function Favourites() {
  let data = useLoaderData() as LaunchData[];
  return (
    <main>
      <h3>Total: ({data.length})</h3>
      <section id='detail'>
        {data?.map((launch) => {
          return (
            <LaunchItem
              key={launch.flight_number + launch.launch_date_unix}
              launch={launch}
            />
          );
        })}
      </section>
      <div id='footer'>SPACEX@2021</div>
    </main>
  );
}

//CatchBoundary for Throw Responses errors from server Loader and Action.
export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className='errorImage'>
        <img src={errorImage} alt='Catched Error' />
      </div>
      <h1 className='errorText'>
        {caught.status} {caught.statusText}
      </h1>
    </div>
  );
}
//ErrorBoundary for any uncaught Error on server and client components.
//User will recover easy as the error will be nested.
export function ErrorBoundary({ error }: { error: any }) {
  return (
    <div>
      <div className='errorImage'>
        <img src={errorImage} alt='Error Boundary' />
      </div>
      <h1 className='errorText'>{error.message}</h1>
    </div>
  );
}
