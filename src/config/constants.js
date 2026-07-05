export const CITY_SCALE = 1;

export const LAYERS = {
  WATER: 'water',
  LAND: 'land',
  ROAD: 'road',
  BRIDGE: 'bridge',
  METRO: 'metro',
  BUILDING: 'building',
  LABEL: 'label'
};

export const MODES = {
  DAY: 'day',
  NIGHT: 'night'
};

export const CAMERA_PRESETS = {
  overview: { position: [980, 790, 1110], target: [-8, 0, 20] },
  entrance: { position: [-650, 360, 930], target: [-220, 0, 590] },
  concept: { position: [-650, 360, 930], target: [-220, 0, 590] },
  first: { position: [520, 430, 760], target: [-10, 0, 345] },
  reduction: { position: [250, 420, 530], target: [-105, 0, 120] },
  manhattan: { position: [530, 520, 320], target: [28, 0, -98] },
  linear: { position: [530, 520, 320], target: [28, 0, -98] },
  geo: { position: [500, 430, -620], target: [-8, 0, -380] },
  bay: { position: [520, 420, 420], target: [165, 0, 92] },
  physics: { position: [520, 420, 420], target: [165, 0, 92] },
  risk: { position: [640, 330, 1010], target: [300, 0, 650] }
};

export const LABEL_RULES = {
  NEAR_HIDE: 360,
  DISTRICT_MIN: 500,
  LANDMARK_MIN: 420,
  LANDMARK_MAX: 1500,
  MID_MAX: 980
};
