'use client'

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post =>
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      )}
    </div>
  );
}


const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search vars
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResult, setSearchResult] = useState([]);



  // Fetch posts
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt', { cache: 'no-store' });
    const data = await response.json();


    // set all posts 
    setAllPosts(data);
  }


  // fetch posts once when component load
  useEffect(() => {
    fetchPosts();
  }, [])


  // handle search 

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    const searchTerm = e.target.value;
    // assign  input
    setSearchText(searchTerm);

    setSearchTimeout(() => {
      setSearchResult(filterPosts(searchText));
    }, 500)
  }

  // filter and search 
  const filterPosts = (searchTerm) => {
    // "i" case insensitive
    const regex = new RegExp(searchTerm, "i");
    return allPosts.filter((p) => (
      regex.test(p.creator.username) ||
      regex.test(p.prompt) ||
      regex.test(p.tag))
    );
  }


  // handle tag click 

  const handleTagClick = (tag) => {
    setSearchText(tag);

    setSearchResult(filterPosts(tag));
  }


  return (
    <section className="feed">
      <form
        className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All prompts */}
      {searchText ? (<PromptCardList
        data={searchResult}
        handleTagClick={handleTagClick}
      />) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={handleTagClick}
        />
      )}

    </section>
  )
}

export default Feed