import { seedAdmin } from "./seeds/admin.seed";
import { seedLike } from "./seeds/like.seed";
import { seedViewers } from "./seeds/viewers.seed";
// import { seedPortofolios } from "./seeds/portofolios.seed";
import { seedPortfolioCategory } from "./seeds/portofoliosCategory.seed";

async function main() {
  await seedAdmin();
  await seedLike();
  await seedViewers();
  await seedPortfolioCategory();
  // await seedPortofolios();
}

main()
  .then(() => {
    console.log("🌱 Semua seed selesai!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error saat seeding:", err);
    process.exit(1);
  });
