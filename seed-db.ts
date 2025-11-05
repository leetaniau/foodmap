import { db } from "./server/db";
import { foodResources } from "./shared/schema";

async function seed() {
  console.log("Seeding database...");
  
  const resources = [
    {
      name: 'Cass Community Social Services',
      type: 'Food Pantry',
      address: '11850 Woodrow Wilson St, Detroit, MI 48206',
      latitude: '42.3690',
      longitude: '-83.0877',
      hours: 'Mon-Fri 10AM-2PM',
      isOpen: true,
      distance: '0.4 mi'
    },
    {
      name: 'Southwest Community Fridge',
      type: 'Community Fridge',
      address: '7310 W Vernor Hwy, Detroit, MI 48209',
      latitude: '42.3185',
      longitude: '-83.1201',
      hours: '24/7',
      isOpen: true,
      distance: '1.2 mi'
    },
    {
      name: 'Capuchin Soup Kitchen',
      type: 'Hot Meal',
      address: '4390 Conner St, Detroit, MI 48215',
      latitude: '42.3827',
      longitude: '-82.9898',
      hours: 'Mon-Sat 11:30AM-1PM',
      isOpen: false,
      distance: '2.1 mi'
    },
    {
      name: 'Gleaners Community Food Bank',
      type: 'Food Pantry',
      address: '2131 Beaufait St, Detroit, MI 48207',
      latitude: '42.3505',
      longitude: '-83.0245',
      hours: 'Tue-Thu 9AM-4PM',
      isOpen: true,
      distance: '1.8 mi'
    },
    {
      name: 'Midtown Community Fridge',
      type: 'Community Fridge',
      address: '4160 Cass Ave, Detroit, MI 48201',
      latitude: '42.3504',
      longitude: '-83.0642',
      hours: '24/7',
      isOpen: true,
      distance: '0.7 mi'
    },
  ];

  await db.insert(foodResources).values(resources);
  console.log("✅ Database seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Error seeding database:", error);
  process.exit(1);
});
