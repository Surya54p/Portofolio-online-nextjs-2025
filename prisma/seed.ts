import { seedAdmin } from "./seeds/admin.seed";
import { seedLike } from "./seeds/like.seed";

async function main() {
  await seedAdmin();
  await seedLike();
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
