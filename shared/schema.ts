import { sql } from "drizzle-orm";
import { pgTable, text, varchar, numeric, boolean, timestamp, integer, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const orderStatusEnum = pgEnum("order_status", [
  "requested",
  "accepted",
  "in_progress",
  "ready_for_delivery",
  "delivered"
]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("designer"),
  businessName: text("business_name"),
  businessPhone: text("business_phone"),
  businessAddress: text("business_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const designs = pgTable("designs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  designerId: varchar("designer_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const designImages = pgTable("design_images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  designId: varchar("design_id").notNull().references(() => designs.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  whatsapp: text("whatsapp"),
  email: text("email"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const measurements = pgTable("measurements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  chest: numeric("chest", { precision: 6, scale: 2 }),
  waist: numeric("waist", { precision: 6, scale: 2 }),
  hips: numeric("hips", { precision: 6, scale: 2 }),
  shoulder: numeric("shoulder", { precision: 6, scale: 2 }),
  sleeve: numeric("sleeve", { precision: 6, scale: 2 }),
  length: numeric("length", { precision: 6, scale: 2 }),
  inseam: numeric("inseam", { precision: 6, scale: 2 }),
  neck: numeric("neck", { precision: 6, scale: 2 }),
  customMeasurements: jsonb("custom_measurements").$type<Record<string, string>>(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clientId: varchar("client_id").notNull().references(() => clients.id),
  designId: varchar("design_id").notNull().references(() => designs.id),
  designerId: varchar("designer_id").notNull().references(() => users.id),
  status: orderStatusEnum("status").default("requested").notNull(),
  preferredDate: timestamp("preferred_date"),
  notes: text("notes"),
  measurementId: varchar("measurement_id").references(() => measurements.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderFiles = pgTable("order_files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  fileUrl: text("file_url").notNull(),
  fileType: text("file_type").notNull(),
  fileName: text("file_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const billingEntries = pgTable("billing_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: varchar("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  clientId: varchar("client_id").notNull().references(() => clients.id),
  description: text("description").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  paid: boolean("paid").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: text("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  designs: many(designs),
  orders: many(orders),
  notifications: many(notifications),
}));

export const designsRelations = relations(designs, ({ one, many }) => ({
  designer: one(users, {
    fields: [designs.designerId],
    references: [users.id],
  }),
  images: many(designImages),
  orders: many(orders),
}));

export const designImagesRelations = relations(designImages, ({ one }) => ({
  design: one(designs, {
    fields: [designImages.designId],
    references: [designs.id],
  }),
}));

export const clientsRelations = relations(clients, ({ many }) => ({
  measurements: many(measurements),
  orders: many(orders),
  billingEntries: many(billingEntries),
}));

export const measurementsRelations = relations(measurements, ({ one }) => ({
  client: one(clients, {
    fields: [measurements.clientId],
    references: [clients.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  client: one(clients, {
    fields: [orders.clientId],
    references: [clients.id],
  }),
  design: one(designs, {
    fields: [orders.designId],
    references: [designs.id],
  }),
  designer: one(users, {
    fields: [orders.designerId],
    references: [users.id],
  }),
  measurement: one(measurements, {
    fields: [orders.measurementId],
    references: [measurements.id],
  }),
  files: many(orderFiles),
  billingEntries: many(billingEntries),
}));

export const orderFilesRelations = relations(orderFiles, ({ one }) => ({
  order: one(orders, {
    fields: [orderFiles.orderId],
    references: [orders.id],
  }),
}));

export const billingEntriesRelations = relations(billingEntries, ({ one }) => ({
  order: one(orders, {
    fields: [billingEntries.orderId],
    references: [orders.id],
  }),
  client: one(clients, {
    fields: [billingEntries.clientId],
    references: [clients.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertDesignSchema = createInsertSchema(designs).omit({
  id: true,
  createdAt: true,
});

export const insertDesignImageSchema = createInsertSchema(designImages).omit({
  id: true,
  createdAt: true,
});

export const insertClientSchema = createInsertSchema(clients).omit({
  id: true,
  createdAt: true,
});

export const insertMeasurementSchema = createInsertSchema(measurements).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const insertOrderFileSchema = createInsertSchema(orderFiles).omit({
  id: true,
  createdAt: true,
});

export const insertBillingEntrySchema = createInsertSchema(billingEntries).omit({
  id: true,
  createdAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  createdAt: true,
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const bookingFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email().optional().or(z.literal("")),
  whatsapp: z.string().optional(),
  preferredDate: z.string().optional(),
  notes: z.string().optional(),
  chest: z.string().optional(),
  waist: z.string().optional(),
  hips: z.string().optional(),
  shoulder: z.string().optional(),
  sleeve: z.string().optional(),
  length: z.string().optional(),
  measurementNotes: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDesign = z.infer<typeof insertDesignSchema>;
export type Design = typeof designs.$inferSelect;
export type InsertDesignImage = z.infer<typeof insertDesignImageSchema>;
export type DesignImage = typeof designImages.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;
export type InsertMeasurement = z.infer<typeof insertMeasurementSchema>;
export type Measurement = typeof measurements.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrderFile = z.infer<typeof insertOrderFileSchema>;
export type OrderFile = typeof orderFiles.$inferSelect;
export type InsertBillingEntry = z.infer<typeof insertBillingEntrySchema>;
export type BillingEntry = typeof billingEntries.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;
export type BookingFormData = z.infer<typeof bookingFormSchema>;

export type DesignWithImages = Design & { images: DesignImage[] };
export type ClientWithDetails = Client & { 
  measurements: Measurement[];
  orders: OrderWithDetails[];
  billingEntries: BillingEntry[];
  totalSpent: number;
  outstandingBalance: number;
};
export type OrderWithDetails = Order & {
  client: Client;
  design: DesignWithImages;
  files: OrderFile[];
  billingEntries: BillingEntry[];
  measurement?: Measurement;
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  requested: "Requested",
  accepted: "Accepted",
  in_progress: "In Progress",
  ready_for_delivery: "Ready for Delivery",
  delivered: "Delivered",
};

export const ORDER_STATUS_COLORS: Record<string, string> = {
  requested: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  accepted: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  in_progress: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  ready_for_delivery: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  delivered: "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400",
};
