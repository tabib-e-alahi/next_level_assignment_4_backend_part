import { prisma } from "../lib/prisma";

const seedCategories = async () => {
  const categories = [
    { name: "Bangladeshi" },
    { name: "Indian" },
    { name: "Chinese" },
    { name: "Italian" },
    { name: "Thai" },
    { name: "Mexican" },
    { name: "Fast Food" },
    { name: "Desserts" },
    { name: "Beverages" },
    { name: "Seafood" },
    { name: "Coffee" }
    

name:


  ];

  try {
    await prisma.category.createMany({
      data: categories,
      skipDuplicates: true, // prevents duplicates if seed runs again
    });

    console.log("Categories seeded successfully!");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedCategories();