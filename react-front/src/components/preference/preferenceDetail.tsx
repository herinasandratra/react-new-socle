import { useState } from "react";
import { preferenceProps } from "./preferenceProps";
import LanguageOption from "./languageOption";
import Authors from "../common/authorsOptions/authorsSelect";
import Category from "../common/categoryOptions/categoryOptions";
import Sources from "../common/sourcesOptions/sourcesOptions";


function PreferenceForm(props: preferenceProps){
    const [ preferenceData, setPreferenceData]  = useState<preferenceProps>({
        language:props.language,
        birthdate:props.birthdate ?? null,
        author_id: props.author_id,
        source_id: props.source_id,
        category_id: props.category_id
    })
    const onChange = (value:any, name: string) =>{
        let updateData = preferenceData
        updateData = { ...updateData, [name]: value };
        setPreferenceData(() => updateData)
        props.onChange && props.onChange(updateData)
    }
    return (
        <div className="card">
            <div className="card-body">
                <div className="block">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="birthdate">Birthdate</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="birthdate"
                                value={preferenceData.birthdate}
                                onChange={(e:any)=>onChange(e.target.value,'birthdate')}
                            />
                        </div>
                        <div className="form-group">
                            <LanguageOption 
                                language={preferenceData.language}
                                onChange={(lang:any)=>onChange(lang,'language')}
                            />
                        </div>
                        <div className="form-group">
                            <Authors 
                                value={props.author_id ?? 0}
                                label ={'Prefered author'}
                                onChange={(author_id:number)=>onChange(author_id,'author_id')}
                            />
                        </div>
                        <div className="form-group">
                            <Category 
                                value={props.category_id ?? 4}
                                onChange={(category_id:number)=>onChange(category_id,'category_id')}
                            />
                        </div>
                        <div className="form-group">
                            <Sources 
                                value={props.source_id ?? 0}
                                onChange={(source_id:number)=>onChange(source_id,'source_id')}
                            />
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
        
    );

}
export default PreferenceForm;