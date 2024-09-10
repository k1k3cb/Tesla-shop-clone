import prisma from '../lib/prisma';
import { initialData } from './seed';
import { countries } from './seed-countries';
async function seedDatabase() {
  //1. Borrar registros existentes

  // await Promise.all([
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
  
  
    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();
  
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
  // ]);

  //2. Crear categorias

  const { categories, products, users } = initialData;

  await prisma.user.createMany({
    data: users
  });

  await prisma.country.createMany({
    data: countries
  });

  const categoriesData = categories.map(category => ({
    name: category
  }));

  await prisma.category.createMany({
    data: categoriesData
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  //3. Crear productos
  products.forEach(async product => {
    const { type, images, ...restOfData } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...restOfData,
        categoryId: categoriesMap[type]
      }
    });

    //Images
    const imagesData = images.map(image => ({
      productId: dbProduct.id,
      url: image
    }));

    await prisma.productImage.createMany({
      data: imagesData
    });
  });

  console.log('Seed ejecutado correctamente');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  seedDatabase();
})();
