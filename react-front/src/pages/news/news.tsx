import { useEffect, useRef, useState } from "react";
import Navigation from "../../components/navigation/navigation";
import NewsCard from "../../components/news/newsCard";
import { getToken, getUser } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import FilterArticle from "../../components/filter/filterArticle";
import { newsApi } from "../../services/newsServices/newsApi";
import Loader from "../../components/common/loader";
import { filterPropsType } from "../../components/filter/filterPropsType";
import MicroLoader from "../../components/common/microLoader";
function News() {
  const articleContent = useRef<any>(null);
  const user = getUser()
  const navigate = useNavigate()
  const [data, setPaginatedArticle] = useState<Array<any>>([])
  const [lastPage, setLastPage] = useState(-1)
  const [currentPage, setcurrentPage] = useState(0)
  const [nextUrl, setNextUrl] = useState('')
  const [initialParams,setinitialParams] =useState<Omit<filterPropsType,'onSearch'> > ({
      language: user.language,
      category_id: user.category_id,
      source_id: user.source_id,
      author_id: user.author_id,
      start_date: '',
      end_date:''
  })
  const [loading,setLoading] =useState(false)
  const [loadingMicroloader,setMicroloader] =useState(false)

  useEffect(()=>{
    if(!(getToken() && getUser())) navigate("/")
  })
  useEffect(()=>{
    loadPage(initialParams)
    // eslint-disable-next-line
  },[initialParams])
  const loadPage =(params:Omit<filterPropsType,'onSearch'>)=>
  {
    setLoading(() => true)
    newsApi.listArticles(params)
    .then((response:any)=>{
        if(response?.data) {
            updateInitialState(response)
        }
    })
    .catch(()=> console.log('error loading article'))
    .finally(()=> setLoading(() => false))
  }
  const updateInitialState =(response:any)=>{
      const { data , last_page, current_page,next_page_url} =response?.data

      setPaginatedArticle((current:Array<any>)=>[...current, ...data])
      setLastPage(() => last_page)
      setcurrentPage(() => current_page)
      setNextUrl(() => next_page_url)
  }
  const loadMorePage = ()=>{
    setMicroloader(()=>true)
    newsApi.loadMoreArticles(nextUrl,initialParams).then((response:any)=>{
      if(response?.data) {
        updateInitialState(response)
        }
    })
    .catch(()=> console.log('error loading article'))
    .finally(()=> setMicroloader(() => false))
  }
  
  return (
    <div ref={articleContent} style={{ height: '100vh', overflow: 'auto' }}>
    {/* <div ref={articleContent} style={{ height: '100vh', overflow: 'auto' }} onScroll={(event:any) =>{console.log('scroll event: ',event)}}> */}
      {loading ? <Loader />: ''}
      <Navigation/>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-10 mt-5 ">
                <FilterArticle
                    language={user.language}
                    category_id={user.category_id}
                    author_id={user.author_id}
                    source_id={user.source_id}
                    start_date={initialParams.start_date}
                    end_date={initialParams.end_date}
                    onSearch={(searchData:any) => {
                      setLastPage(()=>0)
                      setPaginatedArticle(()=>[])
                      setinitialParams(() => searchData)
                    }}
                />
            </div>
            <div className="col-md-8 col-sm-10">
               {data.map((article:any,index:number)=>
                  <NewsCard 
                    key={'articles'+index}
                    title ={article?.title}
                    createdAt = {article?.created_at}
                    infos = {article?.infos}
                    tags = { article?.tags}
                    author = {article?.author.name}
                    author_id={article?.author.id}
                    categories ={article?.categories}
                    source = {article?.source.name}
                    source_id={article?.source.id}
                    checked ={initialParams}
                  />
                )}
                {
                  (lastPage >0 && lastPage > currentPage) ?
                  (
                    <>
                    {
                      loadingMicroloader ? <MicroLoader /> :
                      <button onClick={loadMorePage} className="btn btn-light mt-3 mb-5" >
                        More Page
                      </button>
                    }
                      
                    </>
                  )
                  :
                  <span className="mt-3 mb-5">
                    No more results.
                  </span>
                }
            </div>
          </div>
        </div>
    </div>
  );
}
  
  export default News;