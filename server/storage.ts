import { type FoodResource, type InsertFoodResource } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getFoodResources(): Promise<FoodResource[]>;
  getFoodResource(id: string): Promise<FoodResource | undefined>;
  updateFoodResource(id: string, updates: Partial<FoodResource>): Promise<FoodResource | undefined>;
}

export class MemStorage implements IStorage {
  private foodResources: Map<string, FoodResource>;

  constructor() {
    this.foodResources = new Map();
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockResources: FoodResource[] = [
      {
        id: '1',
        name: 'Cass Community Social Services',
        type: 'Food Pantry',
        address: '11850 Woodrow Wilson St, Detroit, MI 48206',
        latitude: '42.3690',
        longitude: '-83.0877',
        hours: 'Mon-Fri 10AM-2PM',
        isOpen: true,
        distance: '0.4 mi',
        isFavorite: false,
      },
      {
        id: '2',
        name: 'Southwest Community Fridge',
        type: 'Community Fridge',
        address: '7310 W Vernor Hwy, Detroit, MI 48209',
        latitude: '42.3185',
        longitude: '-83.1201',
        hours: '24/7',
        isOpen: true,
        distance: '1.2 mi',
        isFavorite: false,
      },
      {
        id: '3',
        name: 'Capuchin Soup Kitchen',
        type: 'Hot Meal',
        address: '4390 Conner St, Detroit, MI 48215',
        latitude: '42.3827',
        longitude: '-82.9898',
        hours: 'Mon-Sat 11:30AM-1PM',
        isOpen: false,
        distance: '2.1 mi',
        isFavorite: false,
      },
      {
        id: '4',
        name: 'Gleaners Community Food Bank',
        type: 'Food Pantry',
        address: '2131 Beaufait St, Detroit, MI 48207',
        latitude: '42.3505',
        longitude: '-83.0245',
        hours: 'Tue-Thu 9AM-4PM',
        isOpen: true,
        distance: '1.8 mi',
        isFavorite: false,
      },
      {
        id: '5',
        name: 'Midtown Community Fridge',
        type: 'Community Fridge',
        address: '4160 Cass Ave, Detroit, MI 48201',
        latitude: '42.3504',
        longitude: '-83.0642',
        hours: '24/7',
        isOpen: true,
        distance: '0.7 mi',
        isFavorite: false,
      },
    ];

    mockResources.forEach(resource => {
      this.foodResources.set(resource.id, resource);
    });
  }

  async getFoodResources(): Promise<FoodResource[]> {
    return Array.from(this.foodResources.values());
  }

  async getFoodResource(id: string): Promise<FoodResource | undefined> {
    return this.foodResources.get(id);
  }

  async updateFoodResource(id: string, updates: Partial<FoodResource>): Promise<FoodResource | undefined> {
    const resource = this.foodResources.get(id);
    if (!resource) return undefined;
    
    const updated = { ...resource, ...updates };
    this.foodResources.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
