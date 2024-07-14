import SearchCard from '@/components/SearchCard';
import React from 'react'

const SearchBlogs = ({
    searchParams,
  }: {
    searchParams: {
      author: string;
    };
  }) => {
  return (
    <div>
        <SearchCard authorId={searchParams.author}/>
    </div>
  )
}

export default SearchBlogs