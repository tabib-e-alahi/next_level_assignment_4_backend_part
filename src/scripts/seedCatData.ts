import { prisma } from "../lib/prisma";

const seedCategories = async () => {
      const categories = [
            {
                  name: "BANGLADESHI",
                  slug: "bangladeshi",
                  description: "Traditional Bangladeshi meals with rich spices and home-style flavors.",
                  logo: "https://i.ibb.co.com/078Nggr/bangaldeshi.jpg"
            },
            {
                  name: "INDIAN",
                  slug: "indian",
                  description: "Authentic Indian cuisine known for bold spices and aromatic dishes.",
                  logo: "https://i.ibb.co.com/HjnkX8J/perspective-studio-DUOp-Ulw4u-LY-unsplash-1.jpg"
            },
            {
                  name: "CHINESE",
                  slug: "chinese",
                  description: "Popular Chinese stir-fries, noodles, and savory sauces.",
                  logo: "https://cdn-icons-png.flaticon.com/512/2515/2515183.png"
            },
            {
                  name: "THAI",
                  slug: "thai",
                  description: "Thai dishes balancing sweet, sour, spicy, and savory flavors.",
                  logo: "https://cdn-icons-png.flaticon.com/512/5787/5787016.png"
            },
            {
                  name: "ITALIAN",
                  slug: "italian",
                  description: "Classic Italian pasta, pizza, and Mediterranean-inspired meals.",
                  logo: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png"
            },
            {
                  name: "AMERICAN",
                  slug: "american",
                  description: "Comfort food including burgers, fries, and grilled classics.",
                  logo: "https://cdn-icons-png.flaticon.com/512/1046/1046751.png"
            },
            {
                  name: "MEXICAN",
                  slug: "mexican",
                  description: "Flavorful tacos, burritos, and spicy Mexican street dishes.",
                  logo: "https://cdn-icons-png.flaticon.com/512/2718/2718224.png"
            },
            {
                  name: "TURKISH",
                  slug: "turkish",
                  description: "Turkish kebabs, grilled meats, and rich Mediterranean flavors.",
                  logo: "https://cdn-icons-png.flaticon.com/512/3595/3595458.png"
            },
            {
                  name: "MEDITERRANEAN",
                  slug: "mediterranean",
                  description: "Healthy Mediterranean dishes with olive oil, herbs, and seafood.",
                  logo: "https://cdn-icons-png.flaticon.com/512/3480/3480823.png"
            },
            {
                  name: "FAST FOOD",
                  slug: "fast-food",
                  description: "Quick and tasty meals like burgers, fries, and sandwiches.",
                  logo: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            },
            {
                  name: "STREET FOOD",
                  slug: "street-food",
                  description: "Popular street-style snacks and quick bites from local vendors.",
                  logo: "https://cdn-icons-png.flaticon.com/512/685/685352.png"
            },
            {
                  name: "BBQ & GRILL",
                  slug: "bbq-grill",
                  description: "Smoky grilled meats and barbecue specialties.",
                  logo: "https://cdn-icons-png.flaticon.com/512/2718/2718227.png"
            },
            {
                  name: "SEAFOOD",
                  slug: "seafood",
                  description: "Fresh fish, shrimp, and ocean-inspired dishes.",
                  logo: "https://cdn-icons-png.flaticon.com/512/3075/3075971.png"
            },
            {
                  name: "DESSERTS",
                  slug: "desserts",
                  description: "Sweet treats including cakes, ice cream, and pastries.",
                  logo: "https://cdn-icons-png.flaticon.com/512/1046/1046786.png"
            },
            {
                  name: "BAKERY",
                  slug: "bakery",
                  description: "Fresh breads, pastries, and baked delights.",
                  logo: "https://cdn-icons-png.flaticon.com/512/1046/1046755.png"
            },
            {
                  name: "BEVERAGES",
                  slug: "beverages",
                  description: "Refreshing drinks including juices, tea, coffee, and sodas.",
                  logo: "https://cdn-icons-png.flaticon.com/512/2935/2935307.png"
            },
            {
                  name: "SPANISH",
                  slug: "spanish",
                  description: "Refreshing drinks including juices, tea, coffee, and sodas.",
                  logo: "https://cdn-icons-png.flaticon.com/512/2935/2935307.png"
            }
      ];


      try {
            for (const cat of categories) {
                  await prisma.category.update({
                        where: {
                              name: cat.name
                        },
                        data: {
                              slug: cat.slug,
                              description: cat.description,
                              logo: cat.logo
                        }
                  })
            }

            console.log("Categories updation seeded successfully!");
      } catch (error) {
            console.error("Error seeding categories:", error);
      } finally {
            await prisma.$disconnect();
      }
};

seedCategories();