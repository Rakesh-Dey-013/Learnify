import axios from 'axios'

const YOUTUBE_API_KEY = 'AIzaSyBHRCxSkrboAP4sxsGA9wyPBJTnBZRW4Ls'

export const youtubeAPI = {
  searchVideos: async (query) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: 'snippet',
            q: `${query} tutorial`,
            type: 'video',
            maxResults: 9,
            key: YOUTUBE_API_KEY
          }
        }
      )

      return response.data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium?.url,
        channel: item.snippet.channelTitle,
        link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        type: 'video'
      }))
    } catch (error) {
      console.error('YouTube API Error:', error)
      // Return mock data for demonstration
      return [
        {
          id: '1',
          title: `${query} - Complete Tutorial 2024`,
          description: `Learn ${query} from scratch with this comprehensive tutorial. Master the fundamentals and advanced concepts.`,
          thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=320&h=180&fit=crop',
          channel: 'Learnify Master Class',
          link: '#',
          type: 'video'
        },
        {
          id: '2',
          title: `${query} Crash Course - Learn in 2 Hours`,
          description: `Fast-paced tutorial covering all essential ${query} concepts with practical examples.`,
          thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=320&h=180&fit=crop',
          channel: 'Code With Me',
          link: '#',
          type: 'video'
        },
        {
          id: '3',
          title: `Advanced ${query} Techniques`,
          description: `Take your ${query} skills to the next level with these advanced patterns and techniques.`,
          thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=320&h=180&fit=crop',
          channel: 'Pro Development',
          link: '#',
          type: 'video'
        }
      ]
    }
  }
}

export const documentationAPI = {
  searchDocs: async (query) => {
    try {
      // Mock documentation data with both MDN and DevDocs
      const mockDocs = [
        {
          id: '1',
          title: `${query} - MDN Web Docs`,
          description: `Comprehensive guide and reference for ${query} on MDN Web Docs. Trusted by developers worldwide.`,
          site: 'MDN Web Docs',
          link: `https://developer.mozilla.org/en-US/docs/Web/${query.replace(' ', '_')}`,
          type: 'documentation',
          icon: '📘'
        },
        {
          id: '2',
          title: `${query} - DevDocs API Documentation`,
          description: `Complete API documentation and examples for ${query} on DevDocs.`,
          site: 'DevDocs',
          link: `https://devdocs.io/${query.toLowerCase().replace(' ', '-')}/`,
          type: 'documentation',
          icon: '📚'
        },
        {
          id: '3',
          title: `${query} - Official Documentation`,
          description: `Official documentation and getting started guide for ${query}.`,
          site: 'Official Docs',
          link: '#',
          type: 'documentation',
          icon: '🔧'
        }
      ]
      return mockDocs
    } catch (error) {
      console.error('Documentation API Error:', error)
      return []
    }
  }
}