import { useEffect, useState } from "react";
import { newsApi } from "../../../services/newsServices/newsApi";
import MicroLoader from "../microLoader";
import { selectPropsType } from "../authorsOptions/selectPropsType";

function Tag(props:selectPropsType){
    const [options,setOptions] = useState([])
    const [loading,setLoading] = useState(false)
    const updateOption = (language:string)=>{
        props.onChange && props.onChange(language)
    }
    useEffect(()=>{
        setLoading(()=>true)
        newsApi.listTags()
        .then((response:any)=>{
            const dataOptions = response?.data?.map((data:any)=>({
                value:data.id,
                label:data.name
            }))
            setOptions(()=>dataOptions)
        })
        .catch(()=>setOptions(()=>[]))
        .finally(()=>setLoading(()=>false))
    },[])
    return (<>
            {loading ?<MicroLoader/>:(<>
            <label htmlFor="language">{props?.label ?? 'Tag(Keywords)'}</label>
            <select 
                value={props.value} 
                className="form-control" 
                id="language"
                onChange={(e:any)=>updateOption(e.target.value)}
            >
                <option value={0}></option>

                {
                    options.map((option:any, index:number)=>(
                        <option key={option.value+index} value ={option.value}>
                            {option.label}
                        </option>)
                    )
                }
            </select></>)}
        </>)
}

export default Tag;