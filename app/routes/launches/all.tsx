import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import LaunchItem from "~/components/LaunchItem";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { populateDB } from "~/utils/db.populate";
import { buildMergedArray } from "~/utils/helpers";
import errorImage from "~/assets/error_image.jpeg";
//This action is receiving POST request to /all route -
//ServerSide Favourite Feature
export const action: ActionFunction = async ({ request }) => {
  const form = (await request.formData()) as FormData;
  let isFavourite: FormDataEntryValue | null = form.get("favourite");
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
      status: 400,
    });
  }
};

//ServerSide Loader receiveing GET request to /all route.
//Handling Search feature and Server caching with SQLite Database.
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("search");
  try {
    const searchedLaunches = await db.launches.findMany({
      where: {
        mission_name: {
          contains: query || "",
        },
      },
    });
    console.log(searchedLaunches, query);
    if (query && query !== "") return json(searchedLaunches);
    //Get data from database
    const storedLaunches = await db.launches.findMany();
    console.log(storedLaunches);
    //If there is no data on DB use API.
    if (storedLaunches.length === 0) {
      console.log("API Used");
      const launchesRaw = await fetch("https://api.spacexdata.com/v3/launches");
      const rocketsRaw = await fetch("https://api.spacexdata.com/v3/rockets");
      const launchesData = await launchesRaw.json();
      const rocketsData = await rocketsRaw.json();
      //Merge data as requested with helper function.
      let data = buildMergedArray(launchesData, rocketsData);
      await populateDB(data);
      return json(data);
    } else {
      console.log("Cache Used");
      return json(storedLaunches);
    }
    //TODO add expiration and timer to update the DB every X time.
  } catch (err) {
    throw new Response("Error while searching database", { status: 500 });
  }
};

//ClientSide Component
export default function All() {
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
    <div>
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
