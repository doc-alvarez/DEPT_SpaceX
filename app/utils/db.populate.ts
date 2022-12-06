import { db } from "./db.server";

export async function populateDB(launchData: Array<LaunchData>) {
  await Promise.all(
    launchData.map(async (launch) => {
      await db.launches.create({
        data: {
          ...(launch as any),
        },
      });
    })
  );
}
