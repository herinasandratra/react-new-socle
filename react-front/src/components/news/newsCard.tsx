import { tagLetter } from "../../utils/stringUtils";
import  getTimeAgo  from "../../utils/timer";
import { filterPropsType } from "../filter/filterPropsType";

export type newsPropsType ={
    title?:string,
    createdAt:string,
    infos: Array<any>
    tags: Array<any>,
    author: string,
    author_id: number,
    source_id: number,
    categories:Array<any>,
    source: string,
    checked: Omit<filterPropsType,'onSearch'>
}
function NewsCard(props:newsPropsType){
    // const newLocal = "http://localhost:8000/test.png";
    const {title,createdAt, infos,tags,author,categories,source, checked,author_id,source_id} = props
    const titleFont = title ?? 'No title'
    return (
        <div className="card block mx-auto mt-5">
            <div className="card-header">
                <span className={
                    // eslint-disable-next-line
                    author_id == checked.author_id? 'tag-checked' :''}>{author}</span> - 
                <span className={
                    // eslint-disable-next-line
                    source_id == checked.source_id ? 'tag-checked' :''}>{source}</span>
            </div>
            <div className="card-body">
                <h5>{titleFont}</h5>
                <p className="card-text">{infos.length >= 1 ? infos[0].description : 'No description in your preferred language.'}</p>
                <div className="mb-2">Categories:</div>
                {  
                   categories.length>0 ?categories.map((category:any)=>(
                    <div key={'catetory'+category.id} className="form-check">
                        <input  className="form-check-input" type="checkbox" id={"inlineCheckbox1"+category.id} value="option1" defaultChecked={category.id === checked.category_id} />
                        <label className="form-check-label" htmlFor={"inlineCheckbox1"+category.id}>{category.name}</label>
                  </div>)) 
                  : ''
                }
                {source && <div className="mb-2">Sources: {source}</div>}
                
                {tags.length>0 ? tags.map((tag:any)=>(
                    <span key={'tag'+tag.id} className={
                        // eslint-disable-next-line
                        tag.id == checked.category_id? "tag-checked" :"tag"}>
                        #{tagLetter(tag?.name)}
                    </span>) 
                ): ''}
                
            </div>
            <div className="card-footer text-muted">
                {getTimeAgo(createdAt)}
            </div>
        </div>
    );

}
export default NewsCard;