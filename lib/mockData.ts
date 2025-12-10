import { Message } from "./types";

// Mock data with 20 messages - matches the database structure
export const mockMessages: Message[] = [
  {
    id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    phone_hash: "a1b2c3d4e5f6",
    content: "The moment I realized my worth wasn't tied to their approval.",
    status: "approved",
    created_at: "2024-12-01T10:30:00Z",
    approved_at: "2024-12-01T11:00:00Z",
  },
  {
    id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
    phone_hash: "b2c3d4e5f6a7",
    content: "Walking away from what no longer served my soul.",
    status: "approved",
    created_at: "2024-12-02T14:15:00Z",
    approved_at: "2024-12-02T15:00:00Z",
  },
  {
    id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
    phone_hash: "c3d4e5f6a7b8",
    content: "Choosing peace over being right. That was my turning point.",
    status: "approved",
    created_at: "2024-12-03T09:45:00Z",
    approved_at: "2024-12-03T10:30:00Z",
  },
  {
    id: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    phone_hash: "d4e5f6a7b8c9",
    content: "Learning to love myself after years of self-doubt.",
    status: "pending",
    created_at: "2024-12-04T16:20:00Z",
    approved_at: null,
  },
  {
    id: "5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    phone_hash: "e5f6a7b8c9d0",
    content: "The day I stopped apologizing for taking up space.",
    status: "approved",
    created_at: "2024-12-05T11:00:00Z",
    approved_at: "2024-12-05T12:00:00Z",
  },
  {
    id: "6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
    phone_hash: "f6a7b8c9d0e1",
    content: "Forgiving myself was harder than forgiving anyone else.",
    status: "approved",
    created_at: "2024-12-06T08:30:00Z",
    approved_at: "2024-12-06T09:15:00Z",
  },
  {
    id: "7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
    phone_hash: "a7b8c9d0e1f2",
    content: "Finding strength in vulnerability. My metanoia began there.",
    status: "hidden",
    created_at: "2024-12-07T13:45:00Z",
    approved_at: null,
  },
  {
    id: "8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e",
    phone_hash: "b8c9d0e1f2a3",
    content: "The quiet moments taught me more than the chaos ever did.",
    status: "approved",
    created_at: "2024-12-08T17:00:00Z",
    approved_at: "2024-12-08T18:00:00Z",
  },
  {
    id: "9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f",
    phone_hash: "c9d0e1f2a3b4",
    content: "Letting go of who I thought I should be to become who I am.",
    status: "approved",
    created_at: "2024-12-09T10:15:00Z",
    approved_at: "2024-12-09T11:00:00Z",
  },
  {
    id: "0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a",
    phone_hash: "d0e1f2a3b4c5",
    content: "My metanoia: realizing home was never a place, but a feeling.",
    status: "pending",
    created_at: "2024-12-10T14:30:00Z",
    approved_at: null,
  },
  {
    id: "1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b",
    phone_hash: "e1f2a3b4c5d6",
    content: "Breaking the cycle. For me. For my children. For our future.",
    status: "approved",
    created_at: "2024-12-11T09:00:00Z",
    approved_at: "2024-12-11T09:45:00Z",
  },
  {
    id: "2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c",
    phone_hash: "f2a3b4c5d6e7",
    content: "The moment I chose myself wasn't selfish—it was survival.",
    status: "approved",
    created_at: "2024-12-12T15:45:00Z",
    approved_at: "2024-12-12T16:30:00Z",
  },
  {
    id: "3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d",
    phone_hash: "a3b4c5d6e7f8",
    content: "Healing isn't linear, but every step forward counts.",
    status: "approved",
    created_at: "2024-12-13T11:30:00Z",
    approved_at: "2024-12-13T12:15:00Z",
  },
  {
    id: "4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e",
    phone_hash: "b4c5d6e7f8a9",
    content: "I found my light in the darkness. That was my metanoia.",
    status: "hidden",
    created_at: "2024-12-14T08:00:00Z",
    approved_at: null,
  },
  {
    id: "5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f",
    phone_hash: "c5d6e7f8a9b0",
    content: "The day I realized I was worthy of the love I kept giving away.",
    status: "approved",
    created_at: "2024-12-15T12:00:00Z",
    approved_at: "2024-12-15T13:00:00Z",
  },
  {
    id: "6d7e8f9a-0b1c-2d3e-4f5a-6b7c8d9e0f1a",
    phone_hash: "d6e7f8a9b0c1",
    content: "Setting boundaries changed everything. I wish I'd done it sooner.",
    status: "approved",
    created_at: "2024-12-16T16:30:00Z",
    approved_at: "2024-12-16T17:15:00Z",
  },
  {
    id: "7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b",
    phone_hash: "e7f8a9b0c1d2",
    content: "My turning point was accepting help. Strength isn't always solo.",
    status: "pending",
    created_at: "2024-12-17T10:45:00Z",
    approved_at: null,
  },
  {
    id: "8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c",
    phone_hash: "f8a9b0c1d2e3",
    content: "Dancing in my kitchen at 2am. That's when I knew I was free.",
    status: "approved",
    created_at: "2024-12-18T14:00:00Z",
    approved_at: "2024-12-18T14:45:00Z",
  },
  {
    id: "9a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d",
    phone_hash: "a9b0c1d2e3f4",
    content: "The universe kept sending me signs. I finally listened.",
    status: "approved",
    created_at: "2024-12-19T09:30:00Z",
    approved_at: "2024-12-19T10:15:00Z",
  },
  {
    id: "0b1c2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e",
    phone_hash: "b0c1d2e3f4a5",
    content: "My metanoia: learning that 'no' is a complete sentence.",
    status: "approved",
    created_at: "2024-12-20T17:00:00Z",
    approved_at: "2024-12-20T17:45:00Z",
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

