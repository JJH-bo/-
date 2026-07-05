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
  overview: { position: [980, 760, 1080], target: [60, 0, 60] },
  entrance: { position: [-850, 330, 520], target: [-630, 0, 245] },
  queens: { position: [-770, 430, 230], target: [-455, 0, -60] },
  brooklyn: { position: [140, 440, 720], target: [145, 0, 355] },
  manhattan: { position: [560, 520, 280], target: [155, 0, -140] },
  bay: { position: [850, 410, 520], target: [560, 0, 270] },
  risk: { position: [-120, 330, 820], target: [-165, 0, 560] }
};

export const LABEL_RULES = {
  NEAR_HIDE: 420,
  DISTRICT_MIN: 520,
  LANDMARK_MIN: 520,
  LANDMARK_MAX: 1540,
  MID_MAX: 1080
};
