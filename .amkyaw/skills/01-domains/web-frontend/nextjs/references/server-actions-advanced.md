# Server Actions Advanced

## Basic Usage

```tsx
// app/actions.ts
'use server';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  await db.create({ title });
  revalidatePath('/posts');
}
```

```tsx
// app/new/page.tsx
import { createPost } from '../actions';

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  );
}
```

## With TypeScript

```tsx
'use server';

interface PostData {
  title: string;
  content: string;
}

export async function createPost(data: PostData) {
  const post = await db.post.create({ data });
  revalidatePath('/posts');
  return post;
}
```

## Error Handling

```tsx
'use server';

export async function createPost(data: PostData) {
  try {
    const post = await db.post.create({ data });
    revalidatePath('/posts');
    return { success: true, post };
  } catch (error) {
    return { success: false, error: 'Failed to create post' };
  }
}
```
