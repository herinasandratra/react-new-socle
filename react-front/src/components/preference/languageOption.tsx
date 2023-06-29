import { LanguageOptionProps } from "./LanguageOptionProps";

export const optionLanguage = [
    {
        label:'French',
        value:'fr'
    },
    {
        label:'English',
        value:'en'
    },
    {
        label:'Espagnol',
        value:'esp'
    },
    {
        label:'Deutch',
        value:'deu'
    },
];
function LanguageOption(props:LanguageOptionProps){
    const updateOption = (language:string)=>{
        props.onChange && props.onChange(language)
    }
    return (<>
            <label htmlFor="language">Language</label>
            <select 
                value={props.language} 
                className="form-control" 
                id="language"
                onChange={(e:any)=>updateOption(e.target.value)}
            >
                <option  value ={''}></option>
                {
                    optionLanguage.map((option:any, index:number)=>(
                        <option key={option.value+index} value ={option.value}>
                            {option.label}
                        </option>)
                    )
                }
            </select>
        </>)
}

export default LanguageOption;