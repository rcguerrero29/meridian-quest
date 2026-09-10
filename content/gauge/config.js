const STOREPFX="gauge";
/* MEASURED: the shared suite requires GAMENAME (test/engine.smoke.js:64) and docs/NEW-WORLD.md
   mentions it ZERO times — a required global missing from the template's own list of them. */
const GAMENAME="El Faro";
const GAMEV="gauge-v1";
const MAXXP=50;
const LEVELS=[0];
const CAMDEF="top";
const CAMERAS=["top","front"];   /* a pack that does not want 3D — the CAMERAS seam, mq-v133 */
const ENDLESS=true;              /* this world does not end */
const PLACES={
  home:"lamp",spawn:[1,1],street:"lamp",park:"lamp",
  parkIn:[1,1,"right"],parkDog:[2,1],parkDogHome:[3,1],parkAdopt:[[1,4],[2,4],[3,4]]   /* must be WALKABLE — [4,1] is the barrel */,
  friends:["lamp"],upstairs:"lamp"
};
