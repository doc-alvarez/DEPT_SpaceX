export const buildMergedArray = (launchesData: any, rocketData: any) => {
  const mergedArray = launchesData.map((launchObject: any) => {
    const rocketId = launchObject.rocket.rocket_id;
    let {
      flight_number,
      mission_name,
      launch_date_unix,
      details,
      links: { mission_patch },
      rocket,
    } = launchObject;
    rocketData.forEach((__rocket__: any) => {
      if (rocket.rocket_id === rocketId) {
        let { active, cost_per_launch, company } = __rocket__;
        let { rocket_name } = rocket;
        rocket = {
          rocket_name,
          rocket_id: rocketId,
          active,
          cost_per_launch,
          company,
        };
      }
    });
    return {
      flight_number,
      mission_patch: mission_patch || "",
      details: details || "",
      ...rocket,
      mission_name,
      launch_date_unix,
      isFavourite: false,
    };
  });
  return mergedArray;
};
