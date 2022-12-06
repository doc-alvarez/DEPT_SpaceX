import { useFetcher, useLocation } from "@remix-run/react";
import React from "react";

export default function Favourite({
  launch,
  setLoading,
}: {
  launch: LaunchData;
  setLoading: any;
}) {
  const fetcher = useFetcher();
  let isFavourite = launch.isFavourite;
  if (fetcher.submission) {
    isFavourite = fetcher.submission.formData.get("favourite") === "true";
  }
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname !== "/launches/all") {
      setLoading(fetcher.state !== "idle");
    }
  }, [fetcher.state, location, setLoading]);

  return (
    <fetcher.Form method='post'>
      <input type='hidden' name='mission_name' value={launch.mission_name} />
      <input
        type='hidden'
        name='launch_record'
        value={JSON.stringify(launch)}
      />
      <button
        name='favourite'
        value={isFavourite ? "false" : "true"}
        aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavourite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
