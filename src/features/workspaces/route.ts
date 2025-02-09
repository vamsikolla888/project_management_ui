import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { sessionMiddlware } from '@/lib/sessionMiddleware';
import { workspaceSchema } from './schema';
import { DATABASE_ID, IMAGEBUCKET_ID, WORKSPACE_ID } from '@/config';
import { ID } from 'node-appwrite';


const app = new Hono()
      .post("/", sessionMiddlware, zValidator("form", workspaceSchema), async c => {
        const databases = c.get("databases");
        const user = c.get("user");
        const storage = c.get("storage");
        const { name, image } = c.req.valid("form");

        let uploadedImageUrl: string | undefined;

        if(image instanceof File)
        {
          const file = await storage.createFile(IMAGEBUCKET_ID, ID.unique(), image);
          const arrayBuffer = await storage.getFilePreview(IMAGEBUCKET_ID, file.$id);
          uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString()}`;
        }

        const workspace = await databases.createDocument(DATABASE_ID, WORKSPACE_ID, ID.unique(), { name, userId: user.$id, imageUrl: uploadedImageUrl });
        return c.json({ data: workspace })
      })
export default app;