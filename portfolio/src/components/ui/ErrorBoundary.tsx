import {Component,type ErrorInfo,type ReactNode} from 'react';
import i18n from '../../locales';
export default class ErrorBoundary extends Component<{children:ReactNode},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return{failed:true}}
 componentDidCatch(error:Error,info:ErrorInfo){console.error('Portfolio rendering error',error,info.componentStack)}
 render(){if(this.state.failed)return <main className="container error-page"><h1>{i18n.t('ui.error')}</h1><button className="button primary" onClick={()=>location.reload()}>{i18n.t('ui.reload')}</button></main>;return this.props.children}
}
