"use client"
import { useState, useEffect } from 'react'
import pb from '../../lib/pocketbase'
import PostsCard from './postsCard'
import { useRouter } from 'next/navigation' // Import useRouter for navigation

export default function PostsListingCard() {
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter() // Initialize useRouter

  useEffect(() => {
    async function fetchPosts() {
      try {
        const records = await pb.collection('posts').getList(1, 50, {
          sort: '-created',
        })
        setPost(records.items)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Slice the posts array to only show the first 8 items
  const displayedPosts = post.slice(0, 8)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {displayedPosts.map((post) => (
          <PostsCard
            key={post.id}
            name={post.name}
            description={post.description}
            type={post.type}
            image_url={post.image_url}
            price={post.price}
          />
        ))}
      </div>
      {/* Add a "View All Posts" button */}
      {post.length > 8 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push('/posts')} // Redirect to /posts
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            View All Posts
          </button>
        </div>
      )}
    </div>
  )
}