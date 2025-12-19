import { Message } from "./types";

// Messages with specific character lengths: 500, 356, and 240
// Each message includes meaningful content at the specified length

const message500a = "The moment I realized my worth wasn't tied to their approval was the day everything changed. For years, I had been seeking validation from people who couldn't even see their own light, let alone appreciate mine. I bent myself into shapes that didn't fit, spoke words that weren't mine, and smiled when my soul was crying. But one morning, I woke up and understood that the only approval I ever needed was my own. That realization didn't come easy—it came after countless nights of tears and self-doubt.";

const message500b = "Walking away from what no longer served my soul was the hardest decision I ever made, but also the most liberating. I had invested years into relationships, careers, and dreams that looked perfect on paper but felt hollow inside. Everyone told me I was crazy to leave, that I was throwing away everything I had built. But they couldn't feel the emptiness that had taken residence in my chest. They couldn't hear the quiet voice inside me begging for something more authentic, more aligned with who I was becoming.";

const message500c = "My metanoia began in the most unexpected place—a hospital waiting room at 3 AM, surrounded by strangers yet feeling completely alone. That night, I made a promise to myself that I would never again prioritize anyone else's comfort over my own well-being. It took hitting rock bottom to understand that I had been living someone else's life, following a script written by expectations and fear. From that moment forward, I chose to write my own story, even if the pages were messy and uncertain.";

const message356a = "Choosing peace over being right was my turning point. I spent so much energy defending my position, proving my worth, fighting battles that left me exhausted and empty. Then one day, I simply stopped. I let go of the need to be understood by everyone. The silence that followed wasn't defeat—it was freedom. It was the sound of my own breath, my own heartbeat, finally loud enough to hear.";

const message356b = "The day I stopped apologizing for taking up space was the day I started living. I had made myself small for so long, shrinking to fit into rooms that were never meant for me. Now I stand tall, speak loudly, and take up every inch of space I deserve. My existence is not an inconvenience—it is a gift, and I finally believe that with my whole heart.";

const message356c = "Forgiving myself was harder than forgiving anyone else. I held onto my mistakes like they defined me, replaying every wrong turn, every harsh word, every moment of weakness. But healing required me to extend the same grace to myself that I so freely gave others. I am human. I am flawed. And I am still worthy of love and second chances.";

const message240a = "The quiet moments taught me more than the chaos ever did. In stillness, I found clarity. In solitude, I found strength. The noise of the world had drowned out my inner voice for too long. Now I protect my peace like the precious gift it is.";

const message240b = "Letting go of who I thought I should be to become who I am—that was my metanoia. The expectations, the timelines, the comparisons—I released them all. What remained was raw, authentic, and finally free.";

const message240c = "Breaking the cycle. For me. For my children. For our future. I refused to pass down the pain that was passed to me. The chain of hurt ends here, with courage, with intention, with love that heals instead of harms.";

// Mock data with mixed character lengths in random order
export const mockMessages: Message[] = [
  {
    id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    phone_hash: "a1b2c3d4e5f6",
    content: message240a,
    status: "approved",
    created_at: "2024-12-01T10:30:00Z",
    approved_at: "2024-12-01T11:00:00Z",
  },
  {
    id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
    phone_hash: "b2c3d4e5f6a7",
    content: message500a,
    status: "approved",
    created_at: "2024-12-02T14:15:00Z",
    approved_at: "2024-12-02T15:00:00Z",
  },
  {
    id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
    phone_hash: "c3d4e5f6a7b8",
    content: message356a,
    status: "approved",
    created_at: "2024-12-03T09:45:00Z",
    approved_at: "2024-12-03T10:30:00Z",
  },
  {
    id: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    phone_hash: "d4e5f6a7b8c9",
    content: message500b,
    status: "approved",
    created_at: "2024-12-04T16:20:00Z",
    approved_at: "2024-12-04T17:00:00Z",
  },
  {
    id: "5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    phone_hash: "e5f6a7b8c9d0",
    content: message240b,
    status: "approved",
    created_at: "2024-12-05T11:00:00Z",
    approved_at: "2024-12-05T12:00:00Z",
  },
  {
    id: "6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
    phone_hash: "f6a7b8c9d0e1",
    content: message356b,
    status: "approved",
    created_at: "2024-12-06T08:30:00Z",
    approved_at: "2024-12-06T09:15:00Z",
  },
  {
    id: "7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
    phone_hash: "a7b8c9d0e1f2",
    content: message500c,
    status: "approved",
    created_at: "2024-12-07T13:45:00Z",
    approved_at: "2024-12-07T14:30:00Z",
  },
  {
    id: "8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e",
    phone_hash: "b8c9d0e1f2a3",
    content: message240c,
    status: "approved",
    created_at: "2024-12-08T17:00:00Z",
    approved_at: "2024-12-08T18:00:00Z",
  },
  {
    id: "9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f",
    phone_hash: "c9d0e1f2a3b4",
    content: message356c,
    status: "approved",
    created_at: "2024-12-09T10:15:00Z",
    approved_at: "2024-12-09T11:00:00Z",
  },
];

// Helper function to get only approved messages (for messages page)
export function getApprovedMessages(): Message[] {
  return mockMessages.filter((msg) => msg.status === "approved");
}

// Helper function to get all messages (for dashboard)
export function getAllMessages(): Message[] {
  return mockMessages;
}
