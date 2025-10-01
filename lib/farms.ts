import farmsData from './farms-data.json';

export interface Crop {
  crop_name: string;
  season: string;
  area_planted: number;
  expected_yield: number; 
  actual_yield: number;
  status: 'growing' | 'harvested' | 'planned';
}

export interface Farm {
  id: number;
  farm_name: string;
  location: string;
  owner: string;
  established_date: string;
  certifications: string[];
  total_acreage: number;
  active_crops: string[];
  annual_yield: number;
  crops: Crop[];
}

export interface AddFarmState {
  success?: boolean;
  error?: string;
  message?: string;
}

export const initialState: AddFarmState = {};

let farmsStore: Farm[] = [...farmsData] as Farm[];

export function getAllFarms(): Farm[] {
  return farmsStore;
}

export function getFarmById(id: number): Farm | undefined {
  const farms = getAllFarms();
  return farms.find((farm) => farm.id === id);
}

export function addFarm(farm: Farm): Farm {
  const normalizedFarm = {
    ...farm,
    crops: farm.crops.map((crop) => ({
      crop_name: crop.crop_name,
      season: crop.season,
      area_planted: crop.area_planted,
      expected_yield: crop.expected_yield,
      actual_yield: crop.actual_yield,
      status: crop.status,
    })),
  };
  
  farmsStore.push(normalizedFarm);
  return normalizedFarm;
}
