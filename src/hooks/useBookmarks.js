import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('learnify_bookmarks')
    if (saved) {
      setBookmarks(JSON.parse(saved))
    }
  }, [])

  const saveBookmarks = (newBookmarks) => {
    setBookmarks(newBookmarks)
    localStorage.setItem('learnify_bookmarks', JSON.stringify(newBookmarks))
  }

  const addBookmark = (item, type) => {
    const newBookmark = {
      id: `${type}_${Date.now()}`,
      type,
      ...item,
      addedAt: new Date().toISOString()
    }

    const isAlreadyBookmarked = bookmarks.some(
      bookmark => bookmark.link === item.link && bookmark.type === type
    )

    if (isAlreadyBookmarked) {
      toast.info('Already bookmarked!')
      return
    }

    const newBookmarks = [...bookmarks, newBookmark]
    saveBookmarks(newBookmarks)
    toast.success('Added to bookmarks!')
  }

  const removeBookmark = (id) => {
    const newBookmarks = bookmarks.filter(bookmark => bookmark.id !== id)
    saveBookmarks(newBookmarks)
    toast.success('Removed from bookmarks!')
  }

  return {
    bookmarks,
    addBookmark,
    removeBookmark
  }
}