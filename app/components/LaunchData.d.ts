interface Rocket {
  rocket_id: string;
  rocket_name: string;
  active: boolean;
  cost_per_launch: number;
  company: string;
}
interface LaunchData {
  isFavourite: boolean;
  flight_number: number;
  mission_name: string;
  launch_date_unix: number;
  details: string;
  mission_patch: string;
  rocket: Rocket;
}
