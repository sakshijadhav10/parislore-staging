import { users, stories, submissions, type User, type InsertUser, type Story, type InsertStory, type Submission, type InsertSubmission } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getStories(): Promise<Story[]>;
  getStory(id: number): Promise<Story | undefined>;
  createStory(story: InsertStory): Promise<Story>;
  
  getSubmissions(): Promise<Submission[]>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stories: Map<number, Story>;
  private submissions: Map<number, Submission>;
  private currentUserId: number;
  private currentStoryId: number;
  private currentSubmissionId: number;

  constructor() {
    this.users = new Map();
    this.stories = new Map();
    this.submissions = new Map();
    this.currentUserId = 1;
    this.currentStoryId = 1;
    this.currentSubmissionId = 1;
    
    // Initialize with sample stories
    this.initializeStories();
  }

  private initializeStories() {
    const sampleStories: InsertStory[] = [
      {
        title: "The Secret Café of Montmartre",
        excerpt: "Tucked away behind ivy-covered walls, this century-old café serves stories with every cup, where locals share tales of artists who once sketched their dreams on napkins.",
        content: "Full story content here...",
        author: "Marie Dubois",
        imageUrl: "https://pixabay.com/get/gc3f441b08927ece11140278556f2dd0e8f18a22d966ef2537bfc6e056b2aba2a3de854963c8311e9bf31afc00bd31793bb84466eb76f755e991dc3614c3c2273_1280.jpg"
      },
      {
        title: "Love Letters by the Seine",
        excerpt: "For decades, lovers have left messages in the stone crevices of Pont des Arts. A street artist collects these forgotten letters, creating installations that celebrate eternal romance.",
        content: "Full story content here...",
        author: "Jean-Luc Martin",
        imageUrl: "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300"
      },
      {
        title: "The Baker's Dawn Symphony",
        excerpt: "At 4 AM, while Paris sleeps, the city's bakers begin their ancient ritual. The sound of kneading dough and crackling ovens creates the city's first music of each new day.",
        content: "Full story content here...",
        author: "Pierre Rousseau",
        imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300"
      },
      {
        title: "Underground Poetry",
        excerpt: "In the depths of Métro Châtelet, a musician plays forgotten melodies. Commuters pause, transformed from hurried strangers into an impromptu audience sharing a moment of magic.",
        content: "Full story content here...",
        author: "Sophie Leroux",
        imageUrl: "https://images.unsplash.com/photo-1517732306149-e8f829eb588a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300"
      },
      {
        title: "The Garden's Memory Keeper",
        excerpt: "Every morning, an elderly man feeds pigeons in Luxembourg Gardens while sharing stories of Paris during wartime. His tales preserve memories that textbooks cannot capture.",
        content: "Full story content here...",
        author: "Claude Moreau",
        imageUrl: "https://i.pinimg.com/736x/5e/fc/68/5efc6874f7f0d0bbf566a51f24df4e5d.jpg"
      },
      {
        title: "Colors of the Latin Quarter",
        excerpt: "A street artist paints murals that tell the neighborhood's evolution. Each brushstroke captures the spirit of students, philosophers, and dreamers who've walked these cobblestones for centuries.",
        content: "Full story content here...",
        author: "Amélie Blanc",
        imageUrl: "https://i.pinimg.com/736x/5b/e1/ec/5be1ecdabf66ad6600eb5e7837570a44.jpg"
      }
    ];

    sampleStories.forEach(story => {
      this.createStory(story);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getStories(): Promise<Story[]> {
    return Array.from(this.stories.values());
  }

  async getStory(id: number): Promise<Story | undefined> {
    return this.stories.get(id);
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.currentStoryId++;
    const story: Story = { ...insertStory, id };
    this.stories.set(id, story);
    return story;
  }

  async getSubmissions(): Promise<Submission[]> {
    return Array.from(this.submissions.values());
  }

  async createSubmission(insertSubmission: InsertSubmission): Promise<Submission> {
    const id = this.currentSubmissionId++;
    const submission: Submission = { ...insertSubmission, id };
    this.submissions.set(id, submission);
    return submission;
  }
}

export const storage = new MemStorage();
