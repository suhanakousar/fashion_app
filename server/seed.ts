import { db } from "./db";
import { users, designs, designImages, clients, measurements, orders, orderFiles, billingEntries, categories, notifications } from "@shared/schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  const existingUsers = await db.select().from(users);
  if (existingUsers.length > 0) {
    console.log("Database already has users, skipping seed.");
    return;
  }

  const hashedPassword = await bcrypt.hash("password123", 10);
  const [designer] = await db.insert(users).values({
    name: "Maria Chen",
    email: "designer@atelier.com",
    password: hashedPassword,
    role: "designer",
    businessName: "Atelier Studio",
    businessPhone: "+1 (555) 123-4567",
    businessAddress: "123 Fashion Ave, New York, NY 10001",
  }).returning();

  console.log("Created designer:", designer.email);

  const categoryNames = ["Dresses", "Evening Wear", "Suits", "Traditional", "Casual", "Accessories"];
  for (const name of categoryNames) {
    await db.insert(categories).values({ name });
  }
  console.log("Created categories");

  const designData = [
    {
      title: "Elegant Evening Gown",
      description: "A stunning floor-length gown featuring delicate beadwork and a flattering silhouette. Perfect for galas and formal events.",
      price: "2500.00",
      category: "Evening Wear",
      isPublished: true,
      images: [
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800",
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      ],
    },
    {
      title: "Classic Tailored Suit",
      description: "A perfectly tailored suit with modern slim-fit design. Made from premium Italian wool for the discerning professional.",
      price: "1800.00",
      category: "Suits",
      isPublished: true,
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
      ],
    },
    {
      title: "Bohemian Summer Dress",
      description: "A light and airy summer dress with flowing fabric and beautiful floral prints. Perfect for garden parties.",
      price: "450.00",
      category: "Dresses",
      isPublished: true,
      images: [
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
      ],
    },
    {
      title: "Silk Cocktail Dress",
      description: "An elegant knee-length cocktail dress made from luxurious silk. Features a sophisticated neckline and modern cut.",
      price: "850.00",
      category: "Dresses",
      isPublished: true,
      images: [
        "https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=800",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
      ],
    },
    {
      title: "Traditional Wedding Lehenga",
      description: "A breathtaking bridal lehenga with intricate hand embroidery and traditional motifs. Made to order with your choice of colors.",
      price: "4500.00",
      category: "Traditional",
      isPublished: true,
      images: [
        "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800",
      ],
    },
    {
      title: "Minimalist Blazer",
      description: "A sleek, modern blazer with clean lines and impeccable tailoring. Perfect for business casual looks.",
      price: "650.00",
      category: "Casual",
      isPublished: true,
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
      ],
    },
    {
      title: "Vintage-Inspired Gown",
      description: "A romantic gown inspired by 1950s Hollywood glamour. Features a sweetheart neckline and full skirt.",
      price: "1950.00",
      category: "Evening Wear",
      isPublished: true,
      images: [
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
      ],
    },
    {
      title: "Silk Scarf Collection",
      description: "Hand-painted silk scarves featuring original artwork. Each piece is one of a kind.",
      price: "175.00",
      category: "Accessories",
      isPublished: true,
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
      ],
    },
  ];

  const createdDesigns = [];
  for (const d of designData) {
    const [design] = await db.insert(designs).values({
      designerId: designer.id,
      title: d.title,
      description: d.description,
      price: d.price,
      category: d.category,
      isPublished: d.isPublished,
    }).returning();

    for (let i = 0; i < d.images.length; i++) {
      await db.insert(designImages).values({
        designId: design.id,
        imageUrl: d.images[i],
        sortOrder: i,
      });
    }

    createdDesigns.push(design);
  }
  console.log(`Created ${createdDesigns.length} designs`);

  const clientData = [
    { name: "Sarah Johnson", phone: "+1 (555) 234-5678", email: "sarah.j@email.com", whatsapp: "+1 (555) 234-5678" },
    { name: "Emily Davis", phone: "+1 (555) 345-6789", email: "emily.d@email.com", whatsapp: "+1 (555) 345-6789" },
    { name: "Michael Chen", phone: "+1 (555) 456-7890", email: "michael.c@email.com", whatsapp: "+1 (555) 456-7890" },
    { name: "Jessica Williams", phone: "+1 (555) 567-8901", email: "jess.w@email.com", whatsapp: "+1 (555) 567-8901" },
    { name: "Amanda Brown", phone: "+1 (555) 678-9012", email: "amanda.b@email.com", whatsapp: "+1 (555) 678-9012" },
    { name: "David Lee", phone: "+1 (555) 789-0123", email: "david.l@email.com", whatsapp: "+1 (555) 789-0123" },
  ];

  const createdClients = [];
  for (const c of clientData) {
    const [client] = await db.insert(clients).values({
      name: c.name,
      phone: c.phone,
      email: c.email,
      whatsapp: c.whatsapp,
      address: null,
    }).returning();

    await db.insert(measurements).values({
      clientId: client.id,
      label: "Initial Measurements",
      chest: String(32 + Math.floor(Math.random() * 10)),
      waist: String(26 + Math.floor(Math.random() * 8)),
      hips: String(34 + Math.floor(Math.random() * 10)),
      shoulder: String(14 + Math.floor(Math.random() * 4)),
      sleeve: String(23 + Math.floor(Math.random() * 4)),
      length: String(38 + Math.floor(Math.random() * 8)),
    });

    createdClients.push(client);
  }
  console.log(`Created ${createdClients.length} clients with measurements`);

  const orderStatuses = ["requested", "accepted", "in_progress", "ready_for_delivery", "delivered"];

  for (let i = 0; i < 10; i++) {
    const client = createdClients[i % createdClients.length];
    const design = createdDesigns[i % createdDesigns.length];
    const status = orderStatuses[i % orderStatuses.length];

    const [order] = await db.insert(orders).values({
      clientId: client.id,
      designId: design.id,
      designerId: designer.id,
      status: status as any,
      preferredDate: new Date(Date.now() + (7 + i * 7) * 24 * 60 * 60 * 1000),
      notes: i % 3 === 0 ? "Please make sure the fit is slightly loose for comfort." : null,
    }).returning();

    await db.insert(billingEntries).values({
      orderId: order.id,
      clientId: client.id,
      description: `${design.title} - Design Fee`,
      amount: design.price,
      paid: status === "delivered" || (status === "ready_for_delivery" && i % 2 === 0),
    });

    if (i % 3 === 0) {
      await db.insert(billingEntries).values({
        orderId: order.id,
        clientId: client.id,
        description: "Premium Fabric Upgrade",
        amount: "250.00",
        paid: status === "delivered",
      });
    }
  }
  console.log("Created 10 orders with billing entries");

  await db.insert(notifications).values([
    {
      userId: designer.id,
      type: "new_order",
      title: "New Booking",
      message: "Sarah Johnson booked the Elegant Evening Gown",
      read: false,
    },
    {
      userId: designer.id,
      type: "payment_received",
      title: "Payment Received",
      message: "Emily Davis paid $850.00 for Silk Cocktail Dress",
      read: true,
    },
  ]);
  console.log("Created sample notifications");

  console.log("Seed completed successfully!");
  console.log("\n=== Login Credentials ===");
  console.log("Email: designer@atelier.com");
  console.log("Password: password123");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
