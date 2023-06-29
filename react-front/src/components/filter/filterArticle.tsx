import Authors from "../common/authorsOptions/authorsSelect";
import Category from "../common/categoryOptions/categoryOptions";
import Sources from "../common/sourcesOptions/sourcesOptions";
import Tag from "../common/tagsOptions/tagsOptions";
import LanguageOption from "../preference/languageOption";
import { useState } from 'react';
import { filterPropsType } from "./filterPropsType";

function FilterArticle(props:filterPropsType)
{
    const [searchData, setSearchData] = useState<filterPropsType>(props)
    const updateSearch = (value:any,name:string) =>{
        const updatedData = {...searchData,[name]:value}
        setSearchData(()=> updatedData)
    }
    const makeSearch =()=>{
        props.onSearch(searchData)
    }
    return(
        <div className="card">
            <div className="card-header">
                {props?.label ?? 'Filter'}
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="description">Open Search</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="description" 
                        placeholder="BBC politics"
                        value={searchData.description} 
                        onChange={(e:any)=>updateSearch(e.target.value,'description')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="start_date">
                        Start Date
                        {searchData.start_date && <button className="clear-button" onClick={()=>updateSearch('','start_date')} >x</button>}
                    </label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="start_date"
                        max={searchData.end_date}
                        value={searchData.start_date}
                        onChange={(e:any)=>updateSearch(e.target.value,'start_date')}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="end_date">
                        End Date
                        {searchData.end_date && <button className="clear-button" onClick={()=>updateSearch('','end_date')} >x</button>}

                    </label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="end_date"
                        value={searchData.end_date}
                        min={searchData.start_date}
                        onChange={(e:any)=>updateSearch(e.target.value,'end_date')}
                    />
                </div>
                <LanguageOption
                    language={searchData.language}
                    onChange={(lang_id:any)=>updateSearch(lang_id,'language')}
                />
                <Category
                    value={searchData.category_id}
                    onChange={(category_id:any)=>updateSearch(category_id,'category_id')}
                />

                <Tag
                    value={searchData.tag_id ?? 0}
                    onChange={(tag_id:any)=>updateSearch(tag_id,'tag_id')}
                />
                
                <Authors
                    value={searchData.author_id ?? 0}
                    onChange={(author_id:any)=>updateSearch(author_id,'author_id')}
                />
                <Sources
                    value={searchData.source_id ??0}
                    onChange={(source_id:any)=>updateSearch(source_id,'source_id')}
                />

                <button  onClick={makeSearch} className="btn btn-light mt-3">Search</button>
            </div>
            
        </div>
    );
}

export default FilterArticle;