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
  overview: { position: [780, 720, 980], target: [80, 0, 20] },
  manhattan: { position: [370, 360, 480], target: [170, -130, 80] },
  queens: { position: [-520, 360, 500], target: [-360, -70, 40] },
  brooklyn: { position: [-50, 360, 470], target: [40, 190, 40] },
  bay: { position: [760, 330, 420], target: [520, 120, 35] }
};
