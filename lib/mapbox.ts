export const MAPBOX_CONFIG = {
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
  defaultStyle: 'mapbox://styles/mapbox/streets-v11',
  defaultZoom: 11,
  defaultCenter: [0, 0] as [number, number],
};

