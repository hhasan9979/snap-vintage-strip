import { Memory } from '@/types/memory';

export const memoriesData: Memory[] = [
  {
    id: 'memory-1',
    title: 'Sweet Memories',
    date: 'Summer \'85',
    photos: [
      '/photos/memory-1/photo1.jpg',
      '/photos/memory-1/photo2.jpg',
      '/photos/memory-1/photo3.jpg'
    ],
    description: 'A beautiful day captured in time'
  },
  {
    id: 'memory-2',
    title: 'Starry Night',
    date: 'Dec \'87',
    photos: [
      '/photos/memory-2/photo1.jpg',
      '/photos/memory-2/photo2.jpg',
      '/photos/memory-2/photo3.jpg'
    ],
    description: 'Night adventures under the stars'
  },
  {
    id: 'memory-3',
    title: 'Good Times',
    date: 'Spring \'92',
    photos: [
      '/photos/memory-3/photo1.jpg',
      '/photos/memory-3/photo2.jpg',
      '/photos/memory-3/photo3.jpg'
    ],
    description: 'Friends and laughter'
  }
];