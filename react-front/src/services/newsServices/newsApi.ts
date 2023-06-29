import { filterPropsType } from "../../components/filter/filterPropsType";
import CommonApi from "../commonApi"
import { NEWS_URL } from './url';

class NewsApi{
    listAuthor(): Promise<any>
    {
        const axios = new CommonApi()
        return axios.get(NEWS_URL.LIST_AUTHORS)
    }
    listCategory(): Promise<any>
    {
        const axios = new CommonApi()
        return axios.get(NEWS_URL.LIST_CATEGORIES)
    }
    listSources(): Promise<any>
    {
        const axios = new CommonApi()
        return axios.get(NEWS_URL.LIST_SOURCES)
    }
    listTags(): Promise<any>
    {
        const axios = new CommonApi()
        return axios.get(NEWS_URL.LIST_TAG)
    }
    listArticles(params:Omit<filterPropsType,'onSearch'>): Promise<any>
    {
        const axios = new CommonApi()
        return axios.get(NEWS_URL.LIST_ARTICLES,{params})
    }
    loadMoreArticles(url:string,params:Omit<filterPropsType,'onSearch'>) : Promise<any>
    {
        const axios = new CommonApi()
        return axios.get(url,{params})
    }
}
export const newsApi = new NewsApi()