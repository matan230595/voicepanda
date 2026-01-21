import { Hono } from "hono";
import aiRoutes from "@/api/ai";
import translateRoutes from "@/api/translate";

const app = new Hono<{ Bindings: Env }>();

app.route('/api', aiRoutes);
app.route('/api', translateRoutes);

export default app;
