import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import {
    HeaderWrapper,
	Logo,
	Nav,
	NavItem,
	SearchWrapper,
	NavSearch,
	SearchInfo,
	SearchInfoTitle,
	SearchInfoSwitch,
	SearchInfoList,
	SearchInfoItem,
	Addition,
	Button
} from './style'

class Header extends PureComponent {

    getListArea = () => {
        const { focused, list, page, totalPage, mouseIn, handleMouseIn, handleMouseLeave, handleChangePage } = this.props
        const List = list.toJS()   //  把immutable 数组(很多数组的方法是没有的) 转换成 可以直接使用的数组
        let pageList = []
        
        if (List.length) {
            for (let i = (page -1) * 10 ; i < page * 10; i++ ) {
                if (List[i]) {
                    pageList.push(
                        <SearchInfoItem key={List[i]}>{List[i]}</SearchInfoItem>
                    )
                }
                
            }
        }

        if (focused || mouseIn) {
            return (
                <SearchInfo onMouseEnter={handleMouseIn} onMouseLeave={handleMouseLeave}>
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage)}>换一批</SearchInfoSwitch>
                        <SearchInfoList>
                            {pageList}
                        </SearchInfoList>
                    </SearchInfoTitle>
                </SearchInfo>
            )
        } else {
            return null
        }
    }

    render () {
        const { focused, handleInputFocus, handleInputBlur, list, login, logout } = this.props
        return (
            <HeaderWrapper>
                <Link to='/home'>
                    <Logo/>
                </Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载APP</NavItem>
                    {
                        login ? <NavItem onClick={logout} className='right'>退出</NavItem> : 
                        <Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
                    }
                    <NavItem className='right'>
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames="slide"
                        >
                            <NavSearch
                                className={focused ? 'focused' : ''}
                                onFocus={() => handleInputFocus(list.toJS())}
                                onBlur={handleInputBlur}
                            >
                            </NavSearch>
                        </CSSTransition>
                        <i className={focused ? 'focused iconfont zoom': 'iconfont zoom'}>
                            &#xe614;
                        </i>
                        { this.getListArea()}
                    </SearchWrapper>
                    
                </Nav>
                <Addition>
                    <Link to='/write'>
                        <Button className='writting'>
                            <i className="iconfont">&#xe615;</i>
                            写文章
                        </Button>
                    </Link>
                    <Button className='reg'>注册</Button>
                </Addition>
            </HeaderWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    focused: state.getIn(['header', 'focused']),
    // state.get('header').get('focused')
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    login: state.getIn(['login', 'login'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus (list) {
            (!list.length) && dispatch(actionCreators.getList())
            dispatch(actionCreators.searchFocus())
        },
        handleInputBlur () {
            dispatch(actionCreators.searchBlur())
        },
        handleMouseIn () {
            dispatch(actionCreators.mouseEnter())
        },
        handleMouseLeave () {
            dispatch(actionCreators.mouseLeave())
        },
        handleChangePage (page, totalPage) {
            let nextPage
            if (page < totalPage) {
                nextPage = page + 1
            } else {
                nextPage = 1
            }
            dispatch(actionCreators.changePage(nextPage))
        },
        logout() {
			dispatch(loginActionCreators.logout())
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
