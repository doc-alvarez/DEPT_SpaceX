import Favourite from "./Favourite";
import React from "react";

export default function Launch_item({ launch }: { launch: LaunchData }) {
  const [isLoading, setLoading] = React.useState(false);
  return (
    <div
      id='launch_item'
      style={{
        opacity: isLoading ? "0.5" : "1",
      }}
    >
      <div className='img_container'>
        <img
          alt={launch.details}
          key={launch.flight_number}
          src={launch.mission_patch || "https://picsum.photos/200"}
        />
      </div>

      <div className='content_container'>
        <div className='content_title'>
          {launch.mission_name ? <>{launch.mission_name}</> : <i>No Name</i>}{" "}
        </div>

        {launch.details && (
          <p className='content_details'>
            First orbital class rocket capable of reflight
          </p>
        )}

        <div className='date_star_container'>
          {launch.launch_date_unix && (
            <p style={{ minWidth: "fit-content" }}>
              {new Date(launch.launch_date_unix * 1000).toString().slice(0, 15)}
            </p>
          )}
          <Favourite launch={launch} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
}
