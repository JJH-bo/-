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
  overview: { position: [820, 720, 980], target: [80, 0, 10] },
  entrance: { position: [-720, 350, 430], target: [-560, 0, 170] },
  queens: { position: [-590, 390, 360], target: [-360, 0, -70] },
  brooklyn: { position: [0, 430, 520], target: [35, 0, 190] },
  manhattan: { position: [450, 460, 350], target: [170, 0, -130] },
  bay: { position: [790, 380, 390], target: [520, 0, 120] },
  risk: { position: [40, 340, -620], target: [-10, 0, -370] }
};

export const LABEL_RULES = {
  FAR_ONLY: { min: 780, max: Infinity },
  MID_ONLY: { min: 430, max: 1180 },
  ALWAYS: { min: 0, max: Infinity }
};
