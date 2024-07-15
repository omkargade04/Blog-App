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
    <div className='p-10'>
        <SearchCard authorId={searchParams.author}/>
    </div>
  )
}

export default SearchBlogs