import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { actionCreaters } from './store'
import { 
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop
} from './style'
import List from './component/List'
import Recommend from './component/Recommend'
import Topic from './component/Topic'
import Writer from './component/Writer'


class Home extends PureComponent {

    componentDidMount () {
        this.props.changeHomeData()
        this.bindEvents();
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.props.changeScrollTopShow)
    }

    bindEvents = () => {
        window.addEventListener('scroll', this.props.changeScrollTopShow)
    }

    handleScrollTop = () => {
        window.scrollTo(0, 0)
    }

    render () {
        return (
           <HomeWrapper>
               <HomeLeft>
                   <img className="banner-img" src="//upload.jianshu.io/admin_banners/web_images/4390/5f848ed808ef75163e469c1639a248790f7f18af.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt=""/>
                   <Topic />
					<List />
               </HomeLeft>
               <HomeRight>
                    <Recommend />
					<Writer />
               </HomeRight>
               { this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null}
           </HomeWrapper>
        )
    }
}

const mapState = (state) => ({
    showScroll: state.getIn(['home','showScroll'])
})

const mapDispatch = (dispatch) => ({
    changeHomeData () {
        dispatch(actionCreaters.getHomeInfo())
    },
    changeScrollTopShow () {
        let isScroll
        document.documentElement.scrollTop > 100 ? isScroll = true : isScroll = false
        dispatch(actionCreaters.toggleTopShow(isScroll))
    }
})

export default connect(mapState, mapDispatch)(Home)