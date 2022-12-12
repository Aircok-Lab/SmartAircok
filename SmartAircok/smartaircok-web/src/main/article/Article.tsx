import Dashboard from './dashboard/Dashboard'
import Auth from './auth/Auth'
import Data from './data/Data'
import Org from './org/Org'

import { ArticleProps } from '../../items/interfaces';

import './Article.css'

const Article = ({asidelist, asidelistchk} : ArticleProps) => {

  const articleComp = () => {
    switch(asidelistchk){
      case asidelist[0].val :
        return <Dashboard />
      case asidelist[1].val :
        return <Data />
      case asidelist[2].val :
        return <Auth />
      case asidelist[3].val :
        return <Org />
      default :
        return <Dashboard />
    }
  }

  return (
    <article className='aircok-article'>
      {articleComp()} 
    </article>
  );
}

export default Article;