import React from 'react'

const SearchBar = () => {
    return (
        <div className='flex flex-row'>
            <input type='search' className="p-4 w-full bg-gray-50 rounded-lg border border-gray-300 focus:border-none" placeholder="Search..." required/>
            <button type='submit' className='bg-orange py-2 px-4 mx-2 rounded-lg'>Search</button>
        </div> 
    )
}

export default SearchBar;
