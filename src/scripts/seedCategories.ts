import { prisma } from "../lib/prisma";

const seedCategories = async () => {
      const categories = [
            { name: "Bangladeshi" },
            { name: "Indian" },
            { name: "Chinese" },
            { name: "Thai" },
            { name: "Italian" },
            { name: "American" },
            { name: "Mexican" },
            { name: "Turkish" },
            { name: "Mediterranean" },
            { name: "Fast Food" },
            { name: "Street Food" },
            { name: "BBQ & Grill" },
            { name: "Seafood" },
            { name: "Desserts" },
            { name: "Bakery" },
            { name: "Beverages" }
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