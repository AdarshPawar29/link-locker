export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  previewImage: string;
  tags: string[];
  createdAt: string;
  clickCount: number;
}

export interface Locker {
  id: string;
  title: string;
  description: string;
  linkCount: number;
  isPublic: boolean;
  imageUrl: string;
  links: Link[];
}

export const mockLockers: Locker[] = [
  {
    id: "development-resources",
    title: "Development Resources",
    description: "Useful links for web development",
    linkCount: 12,
    isPublic: true,
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
    links: [
      {
        id: "1",
        title: "React Documentation",
        url: "https://react.dev",
        description: "Official React documentation",
        previewImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
        tags: ["react", "docs"],
        createdAt: "2024-03-20",
        clickCount: 5
      }
    ]
  },
  {
    id: "design-inspiration",
    title: "Design Inspiration",
    description: "UI/UX design references",
    linkCount: 8,
    isPublic: false,
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
    links: []
  },
  {
    id: "reading-list",
    title: "Reading List",
    description: "Articles to read later",
    linkCount: 15,
    isPublic: false,
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500&h=300&fit=crop",
    links: []
  }
];