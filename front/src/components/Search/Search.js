function Search({searchValue, setSearchValue, onChangeSearchInput}){
    return(
        <div className="d-flex align-center justify-between mb-40">
            <h1>{searchValue.length > 0 && searchValue.toString() !== '' ? `Search for request : "${searchValue}"` : 'All Sneakers'}</h1>
            <div className="search-block d-flex">
                <img src="img/search.svg" alt="Search"/>
                <input
                    onChange={onChangeSearchInput}
                    value={searchValue}
                    placeholder="Search..."/>
                {searchValue &&
                    <img onClick={() => setSearchValue('')} className="clearImg"
                         src="img/btn-remove.svg"
                         alt="ClearImg"/>}
            </div>
        </div>
    )
}
export default Search